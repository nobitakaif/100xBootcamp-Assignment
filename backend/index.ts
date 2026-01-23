import express from "express"
import { auth } from "./routes/auth"


const app = express()
app.use(express.json())

app.use("/auth", auth)

app.listen(8000,()=>{
    console.log(`server is running on port ${8000}`)
})