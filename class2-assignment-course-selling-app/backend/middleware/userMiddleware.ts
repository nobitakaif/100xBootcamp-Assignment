import type { NextFunction, Request, Response } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";

export const UserMiddleware = async(req:Request, res: Response, next: NextFunction)=>{
    const bearerToken  = req.headers["authorization"]
    // console.log(req.headers.authorization)
    if(!bearerToken){
        res.status(401).json({
            msg : "use brear Token"
        })
        return 
    }
    const token = bearerToken.split(" ")[1]
    console.log(token)
    if(!token){
        res.status(403).json({
            msg : "token is missing"
        })
        return 
    }
    if(!process.env.JWT_SECRET){
        throw new Error("JWT SECRET not present")
        
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    if(decodedToken){
        req.userId = decodedToken.userId as string
        next()
    }
    res.status(403).json({
        msg : "invalid token"
    })
}