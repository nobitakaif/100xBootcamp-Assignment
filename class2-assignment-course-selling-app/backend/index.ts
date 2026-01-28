import express from "express"
import { auth } from "./routes/auth"
import { course } from "./routes/course"


const app = express()
app.use(express.json())

app.use("/auth", auth)
app.use("/api/course",course)

app.listen(8000,()=>{
    console.log(`server is running on port ${8000}`)
})