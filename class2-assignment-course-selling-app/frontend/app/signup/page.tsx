  "use client"
import { motion } from "framer-motion"
import Login  from "../../components/auth" 
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Signup(){
    const [isRotate, setRotate] = useState(false)
    
    return <div>
        <Login/>
    </div>
}