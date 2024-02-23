import validator from "validator";
import { Response, Request } from "express";
import bcrypt, {hashSync} from "bcrypt"
import User from "../models/user.entity";
import { AppDataSoure } from "../models/dataSource";
import Email from "../models/email.entity";

const IsUser = AppDataSoure.getRepository(User)
const IsEmail = AppDataSoure.getRepository(Email)

const signUp = async (req:Request, res:Response) =>{
    const {name, email, password, studentId, profile} = req.body;
    const mailCheck = await IsEmail.findOneBy({email: email})

    if(!validator.isEmail(email)){
        return res.status(406).json({"error": "이메일 포맷에 맞춰주세요."})
    }

    if(await IsUser.findOneBy({email: email})){
        return res.status(409).json({"error": "이미 존재하는 이메일입니다."})
    }

    if(await IsUser.findOneBy({studentId: studentId})){
        return res.status(409).json({"error": "이미 존재하는 학번입니다."})
    }

    if(mailCheck?.key !== "true"){
        return res.status(404).json({
            "error": "메일인증이 완료되지 않았습니다."
        })
    }

    const hashed = hashSync(password, 10);

    await IsUser.save({name: name, email: email, password: hashed, studentId, profile: profile})
    await IsEmail.delete({email: email})

    return res.status(201).json({
        data:null,
        status: 201,
        statusMsg: "회원가입 완료"
    })
}

const getUser = async (req:any, res:Response) =>{
    try{
        const {id} = req.payload;

        const thisUser = await IsUser.findOneBy({id: id});

        if(!thisUser){
            res.status(404).json({
                "error": "정보를 찾을 수 없습니다.",
            })
        }

        return res.status(200).json({
            name: thisUser?.name,
            id: thisUser?.id,
            studentId: thisUser?.studentId,
            temperature: thisUser?.temperature,
            profile: thisUser?.profile,
        })
    }
    catch(err){
        console.error(err)
        return err
    }
}

// 중고, 공구 db추가 되면 반환값 추가하기
const getAnotherUser = async (req: Request, res:Response) =>{
    try{
        const {studentId} = req.params;

        const thisAnotherUser = await IsUser.findOneBy({studentId: studentId});

        if(!thisAnotherUser){
            res.status(404).json({
                "error": "정보를 찾을 수 없습니다.",
            })
        }

        return res.status(200).json({
            id: thisAnotherUser?.id,
            name: thisAnotherUser?.name,
            studentId: thisAnotherUser?.studentId,
            temperature: thisAnotherUser?.temperature, 
            profile: thisAnotherUser?.profile,
        })
    }
    catch(err){
        console.error(err);
        return err;
    }
}

const info =  async (req: any, res: Response) => {
    try{
        const {id} = req.payload;
        const {name, profile, password, studentId} = req.body;

        const thisUser = IsUser.findOneBy({id: id});
        if(!thisUser){
            res.status(404).json({
                "error": "정보를 찾을 수 없습니다.",
            })
        }

        const hashed = hashSync(password, 10);

        await IsUser.update({
            id: id
        },{
            name: name,
            profile: profile,
            password: hashed,
            studentId: studentId
        })

        return res.status(200).json({
            message: "정보가 변경되었습니다."
        })
    }
    catch(err){
        console.error(err);
        return err;
    }
}

const delacc = async (req: any, res: Response) => {
    try{
        const {id} = req.payload;
        const {password} = req.body;

        const thisUser = await IsUser.findOneBy({id: id});
        if(!thisUser){
            return res.status(404).json({
                "error": "정보를 찾을 수 없습니다."
            })
        }
        
        if(!bcrypt.compareSync(password, thisUser.password)){
            return res.status(409).json({
                "error": "비밀번호가 일치하지 않습니다."
            })
        }

        await IsUser.delete({id: id})

        return res.status(200).json({
            message: "계정이 탈퇴되었습니다."
        })

    }
    catch(err){
        console.error(err);
        return err;
    }
}

export {signUp, getUser, getAnotherUser, info, delacc};