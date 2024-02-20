import { Request, Response, NextFunction } from "express"
import { isJWT } from "validator";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

const validationAccess = async (req:any, res:Response, next:NextFunction) =>{
    try{
        const authorization = req.get('authorization')?.split(' ')[1];
        if(!authorization || !isJWT(authorization)){
            return res.status(401).json({
                "error": "유효성 검증에 실패하였습니다."
            })
        }
        const secertKey:string = process.env.SECRET || "jwt-secret-key";
        req.payload = jwt.verify(authorization, secertKey);

        return next();
    }catch(err){
        console.error(err);
        return err;
    }
}

export {validationAccess}