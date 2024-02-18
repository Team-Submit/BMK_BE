import { Response, Request } from "express";
import { AppDataSoure } from "../models/dataSource";
import User from "../models/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import redisCli from "../../redis";

configDotenv();

const IsUser = AppDataSoure.getRepository(User)
const secertKey:string = process.env.SECRET || "jwt-secret-key";

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

export {logIn};