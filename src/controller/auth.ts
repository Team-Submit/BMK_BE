import { Response, Request } from "express";
import { AppDataSoure } from "../models/dataSource";
import User from "../models/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import redisCli from "../../redis";
import { createTransport } from 'nodemailer';
import Email from "../models/email.entity";

configDotenv();

const IsUser = AppDataSoure.getRepository(User)
const secertKey:string = process.env.SECRET || "jwt-secret-key";
const IsEmail = AppDataSoure.getRepository(Email)

const logIn = async (req:Request, res:Response) =>{
    try{
        const {email, password} = req.body;
        const thisUser = await IsUser.findOneBy({email: email});
        if(!thisUser){
            return res.status(404).json({
                "error": "이메일을 찾을 수 없습니다."
            })
        }

        if(!bcrypt.compareSync(password, thisUser.password)){
            return res.status(409).json({
                "error": "비밀번호가 일치하지 않습니다."
            })
        }

        const accessToken = await generateAccessToken(thisUser.id);
        const refreshToken = await generateRefreshToken(accessToken);

        redisCli.set(String(thisUser.id), refreshToken);

        return res.status(201).json({
            accessToken,
            refreshToken
        })
    }
    catch (error){
        return error;
    }
}

const generateAccessToken = (userId: number) =>{

    const accessToken = jwt.sign({ id: userId }, secertKey ,{ expiresIn: '3h'})

    return accessToken;
}

const generateRefreshToken = (accessToken: string) =>{

    const refreshToken = jwt.sign({accessToken}, secertKey, {expiresIn: '2d'})

    return refreshToken;
}

// 이메일 인증에 들어가는 env 추가 방법

// 1. 구글 계정 로그인 후 계정으로 들어가기
// 2. 보안에 들어간 후 2단계 인증 들어가 본인 인증 진행
// 3. 본인인증 후 가장 아래에있는 앱 비밀번호 클릭해서 추가하기(이름은 아무거나 쓰세요)
//    -> 추가하면 무슨 이상한 코드 뜨는데 그거 무조건 복사해두기
// 4. env에 아래 코드에 들어가는 것 처럼 자기 이메일과 앱 비밀번호 만들면 뜨는 비밀번호 입력하기
const sendEmail = async(req:Request, res:Response) =>{
    const emailId = process.env.EMAIL_ID;
    const emailPw = process.env.EMAIL_PW;

    const { email } = req.body;
    const emailRequestCheck = IsEmail.findOneBy({email: email});
    const emailSignCheck = IsUser.findOneBy({email: email});

    if(!emailRequestCheck){
        return res.status(403).json({
            "error": "이미 요청된 메일입니다."
        })
    }

    if(!emailSignCheck){
        return res.status(403).json({
            "error": "이미 가입된 메일입니다."
        })
    }

    const transport = createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:{
            user: emailId,
            pass: emailPw
        }
    })

    try{
        const random = String(Math.floor(Math.random()*999999)).padStart(6, '0');

        await IsEmail.save({
            email: email,
            key: random,
        })

        await transport.sendMail({
            from: emailId,
            to: email,
            subject: '인증 메일입니다.',
            text: `인증 번호는 ${random}`
        })

        return res.status(200).json({
            message: "인증 메일이 전송되었습니다."
        })
    }
    catch(err){
        console.error(err);
        return err;
    }

}

const checkEmail = async (req: Request, res: Response) =>{
    try{
        const {email, code} = req.body;

        const thisCheck = await IsEmail.findOneBy({email: email});

        if(!thisCheck || !code){
            res.status(404).json({
                "error": "인증코드 없음"
            })
        }
        
        if(thisCheck?.key != code){
            res.status(409).json({
                "error": "인증코드 불일치"
            })
        }

        await IsEmail.update({
            email: email
        },{
            key: 'true'
        })

        return res.status(200).json({
            message: "인증이 완료되었습니다."
        })
    }
    catch(err){
        console.error(err)
        return err;
    }
}

export {logIn, sendEmail, checkEmail};