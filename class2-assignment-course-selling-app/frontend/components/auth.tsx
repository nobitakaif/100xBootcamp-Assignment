"use client"
import {  SubmitHandler, useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle} from "./ui/card"
import { Input } from "./ui/input"
import * as z from "zod"
import { FieldGroup } from "./ui/field"
import axios from "axios"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
// import {motion} from "motion/react"
import { motion } from "framer-motion"
import { Router } from "next/router"
import { useRouter } from "next/navigation"
import { ro } from "date-fns/locale"

const MotionCard = motion(Card)

const SingupSchema = z.object({
    email : z.email(),
    password : z.string().min(6,{message : "too short"}).max(20,{message : "too large"}),
    name : z.string().min(3,{message : "too short"}).max(18, {message : "too large"}),
    role : z.enum(["Student", "Instructor"]),
})

export default function Login (){

    const [isLogin, setIsLoggin] = useState(false)
    const router = useRouter()
    // if(localStorage.getItem("token")){
    //     router.push("/")
    // }
    const form = useForm<z.infer<typeof SingupSchema>>({
        resolver : zodResolver(SingupSchema),
        defaultValues : {
            email : "",
            name : "",
            password : "",
            role : "Student"
        }        

    })
    
    type SingupSchemaData = z.infer<typeof SingupSchema>
    const onSubmit:SubmitHandler<SingupSchemaData> = async (data: z.infer<typeof SingupSchema>)=>{
        // alert("")
        if(isLogin){
            const response = await axios.post("http://localhost:8000/auth/signup",{
                email : data.email,
                name : data.name,
                password : data.password,
                role : "Student"
            })    
             if(response.data.id){
                toast.success(`you're are signed up`)
                setIsLoggin(true)
                return
            }
        }
        const response = await axios.post("http://localhost:8000/auth/login",{
            email : data.email,
            password : data.password
        })
        if(response.status){
            toast.success(`you're logged in`)
            router.push("/")
            localStorage.setItem("token", response.data.token)
            return 
        }
        
        
       
        toast.error("Error while signup")
        
        return null
        
    }
    return <div className="h-screen w-full flex flex-col gap-4  justify-center items-center " suppressHydrationWarning>
       <MotionCard className="w-full sm:max-w-md">
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Sign Up</CardTitle> 
                <Button variant={"outline"} onClick={()=>setIsLoggin(c=>!c)}>{isLogin ? "Login" : "Signup"}</Button>
            </CardHeader>
            <CardContent>
                <form id="Login" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Input type="text" id="email" placeholder="enter your email" {...form.register("email")}></Input>
                        {isLogin && <Input type="text" id="name" placeholder="enter your name" {...form.register("name")}></Input>}
                        <Input type="password" id="password" placeholder="enter your password" {...form.register("password")}></Input>
                        <Button type="submit">{isLogin ?  "Singup": "Login"}</Button>                       
                    </FieldGroup>
                </form>
            </CardContent>
       </MotionCard>
    </div>
} 