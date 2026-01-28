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
        // const isInstructor = await prisma.user.findFirst({
        //     where : {
        //         id : userId
        //     }
        // })
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
    res.status(200).json({
        courses : "list of course id and some details"
    })
})

router.get("/courses/:id",async(req,res)=>{
    // get the individual course with lesson
    res.status(200).json({
        lesson : "send all the lesson of given course id in params"
    })
})

router.patch("/courses/:id",UserMiddleware,async(req,res)=>{
    // get the individual course with lesson
    // only instructor can update the lesson of course
    res.status(200).json({
        msg : "lesson is updated"
    })
})

router.delete("/delete/:id", UserMiddleware, async(req,res)=>{
    // only instructor can delete the course id 
    res.status(200).json({
        id : "course.id is deleted "
    })
})


export const course = router