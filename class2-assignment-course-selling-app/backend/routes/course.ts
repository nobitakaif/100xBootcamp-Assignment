import { Router } from "express";
import { UserMiddleware } from "../middleware/userMiddleware";
import { prisma } from "../db";
import { CreateCourseSchema } from "../types/zod.type";

const router = Router()


router.post("/create",UserMiddleware, async(req,res)=>{
    const userId = req.userId
    // todo : check on db only instructor can create the course
    const body = CreateCourseSchema.safeParse(req.body)
    if(!body.success){
        res.status(401).json({
            msg : "failed input validation",
            error : body.error.message
        })
        return 
    }
    try{
        console.log("role of the creator : ", req.role)
        if(req.role == "Instructor"){
            const isCreated = await prisma.course.create({
                data :{
                    instructorId : userId!,
                    description : body.data.description,
                    title : body.data.title,
                    price : body.data.price,
                    lesson : {
                        create : {
                            content : body.data.content,
                            title : body.data.lesson
                        }
                    }
                }
            })
            if(!isCreated.id){
                res.send("course is not created")
                return 
            }
            res.status(200).json({
                msg : "course is succeffully created ",
                courseId : isCreated.id
            })
            return 
        }
            res.status(403).json({
                msg : "access denied"
            })
            return 
                
    }catch(e:any){
        console.log(e.message)
        res.status(500).json({
            msg : "Something happens wrong",
            error : [e.message, e.name]
        })
    }

})

router.get("/courses",async(req,res)=>{
    // get all course public router
    const allCourses = await prisma.course.findMany({
        orderBy : {
            createdAt : "asc"
        }
    })
    if(!allCourses){
        res.status(404).json({
            msg : "something  happens wrong!!"
        })
    }
    res.status(200).json({
        course : allCourses
    })
})

// all lesson of that specific courseId 
router.get("/courses/:id",async(req,res)=>{
    // get the individual course with lesson

    const lesson = await prisma.lesson.findMany({
        where : {
            courseId : req.params.id
        }
    })
    if(!lesson){
        res.status(404).json({
            msg : "no course present "
        })
    }
    
    res.status(200).json({
        msg : lesson
    })
})

// update the lesson by course id 
router.patch("/courses/:id",UserMiddleware,async(req,res)=>{
    // get the individual course with lesson
    // only instructor can update the lesson of course
    if(req.role!="Instructor"){
        res.status(403).json({
            msg : "access denied"
        })
        return 
    }
    try{
        const courseId = Array.isArray(req.params.id)
                ? req.params.id[0]
                : req.params.id
        if(!courseId){
            res.status(411).json({
                msg : "pls give valid courseId"
            })
            return 
        }
        
        const isCreator = await prisma.course.findFirst({
            where : {
                id : courseId,
                instructorId : req.userId!
            }
        })
        if(!isCreator){
            res.status(403).json({
                msg : "Access denied"
            })
            return 
        }
        
        const resposne  = await prisma.lesson.update({
            where : {
                courseId : courseId
            },
            data :{
                title : req.body.title,
                content : req.body.content,
            }
        })
        console.log("conrole reached here")
        res.status(200).json({
            msg : "course is updated",
            time : resposne.updatedAt,
            id : resposne.id
        })
    }catch(e){
        res.status(500).json({
            msg :"something happen wrong, pls try again"
        })
        return 
    }
})

router.delete("/delete/:id", UserMiddleware, async(req,res)=>{
    // only instructor can delete the course id 
    res.status(200).json({
        id : "course.id is deleted "
    })
})


export const course = router