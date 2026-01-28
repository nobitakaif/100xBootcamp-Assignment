
import {  z } from "zod"
import { Role } from "../prisma/generated/prisma/enums"




export const SignupSchema = z.object({
    email : z.email(),
    password : z.string().min(6,{message : "too short"}).max(20,{message : "too large"}),
    name : z.string().min(3,{message : "too short"}).max(18, {message : "too large"}),
    role : z.enum(Role),
})

export const LoginSchema = z.object({
    email : z.email(),
    password : z.string().min(6,{message : "too short"}).max(20,{message : "too large"})
})

export const CreateCourseSchema = z.object({
    title : z.string().min(3,{message : "too short"}).max(18, {message : "too large"}),
    description : z.string().min(3,{message : "too short"}).max(120, {message : "too large"}),
    price : z.float32().min(1,{message : "price should be atleast 1.00 rs"}).max(1000000, {message : "price should be under 1000000"}),
    lesson :  z.string().min(3,{message : "too short"}).max(18, {message : "too large"}),
    content : z.string().min(30, {message : "atleast lesson should be 30 character"}).max(5000000, {message : "Lesson is too big this should be under 5000000 letter"})
})

export const CreateLessonSchema = z.object({
    title :  z.string().min(3,{message : "too short"}).max(18, {message : "too large"}),
    content : z.string().min(30, {message : "atleast lesson should be 30 character"}).max(5000000, {message : "Lesson is too big this should be under 5000000 letter"})
})

export const PurchaseCourseSchema = z.object({
    courseId : z.string().min(3, {message : "course-id is too short"}).max(40,{message : "course-id is too large "})
})