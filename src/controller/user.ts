import validator from "validator";
import { Response, Request } from "express";
import {hashSync} from "bcrypt"
import User from "../models/user.entity";
import { AppDataSoure } from "../models/dataSource";

const IsUser = AppDataSoure.getRepository(User)

const signUp = async (req:Request, res:Response) =>{
    const {name, email, password, studentId, profile} = req.body;
    if(!validator.isEmail(email)){
        return res.status(406).json({"error": "이메일 포맷에 맞춰주세요."})
    }

    if(await IsUser.findOneBy({email: email})){
        return res.status(409).json({"error": "이미 존재하는 이메일입니다."})
    }

    if(await IsUser.findOneBy({studentId: studentId})){
        return res.status(409).json({"error": "이미 존재하는 학번입니다."})
    }

    const hashed = hashSync(password, 10);

    await IsUser.save({name: name, email: email, password: hashed, studentId, profile: profile})

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


export {signUp, getUser};