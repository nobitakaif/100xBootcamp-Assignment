import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const UserMiddleware = async(req:Request, res: Response, next: NextFunction)=>{
    const bearerToken  = req.headers["authorization"]
    // console.log(req.headers.authorization)
    if(!bearerToken){
        res.status(401).json({
            msg : "use brear Token"
        })
        return 
    }
    // console.log(bearerToken)
    const token = bearerToken.split(" ")[1]
    // console.log("brear token :  ",token)
    if(!token){
        res.status(403).json({
            msg : "token is missing"
        })
        return 
    }
    if(!process.env.JWT_SECRET){
        throw new Error("JWT SECRET not present")
        
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if(decodedToken){
        // console.log("decoded token",decodedToken)
        req.userId = decodedToken.id as string
        req.role = decodedToken.role
        next()
        return 
    }
    res.status(403).json({
        msg : "invalid token"
    })
    // next()
}