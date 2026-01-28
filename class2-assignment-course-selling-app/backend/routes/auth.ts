
import { Router } from "express";
import { SignupSchema, LoginSchema } from "../types/zod.type";
import { prisma } from "../db";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { UserMiddleware } from "../middleware/userMiddleware";
const router = Router()

router.post("/signup",async (req,res)=>{
    const userInput = SignupSchema.safeParse(req.body)
    if(!userInput.success){
        res.status(422).json({
            error : userInput.error.message
        })
        return 
    }

    try{
        const hashedPassword = await bcrypt.hash(userInput.data.password, 5)
        
        const user = await prisma.user.create({
            data : {
                email : userInput.data.email,
                name : userInput.data.name,
                role : userInput.data.role ,
                password : hashedPassword
            }
        })

        res.status(200).json({
            id : user.id
        })
    }catch(e){
        res.status(409).json({
            msg : "email is already in used"
        })
    }
})

router.post("/login",async (req,res)=>{
    const userInput = LoginSchema.safeParse(req.body)

    if(!userInput.success){
        res.status(422).json({
            msg : userInput.error.message
        })
        return 
    }
    try{
        const isUser = await prisma.user.findFirst({
            where :{
                email : userInput.data.email
            }
        })
        if(!isUser){
            res.status(404).json({
                msg : "pls create account first!"
            })
            return 
        }
        const checkPassword = await bcrypt.compare( userInput.data.password, isUser.password)
        if(!checkPassword){
            res.status(422).json({
                msg : "incorrect password"
            })
        }
        const token = jwt.sign({
            id : isUser.id,
            role : isUser.role
        }, process.env.JWT_SECRET!)
        res.status(200).json({
            token : token
        })
    }catch(e){
        res.status(500).json({
            msg : "something went wrong"
        })
    }
})

router.get("/getId",UserMiddleware, (req,res)=>{
    console.log(req.userId)
    res.send(req.userId)
})
export const auth = router