"use client"
import Image from "next/image";
import { useEffect, useState } from "react"
import { motion,AnimatePresence  } from "framer-motion"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function Home() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAnimate, setIsAnimate] = useState(true)
  // const router = useRouter()
  // if(!localStorage.getItem("token")){
  //   router.push("/signup")
  //   return 
  // }
  return (
    <div className="bg-slate-100 h-screen w-full flex flex-col justify-center items-center">
      <AnimatePresence>
        {isAnimate && <motion.h1
        initial={{
          scale : 1, opacity : 1
        }}
        exit={{
          scale : 6, 
          opacity : 0
        }}
          transition={{
            duration : 0.8,
            ease : "easeInOut"
          }}
          className={`text-6xl font-bold ${isAnimate && 'hidden'} overflow-hidden`}
        >
          Sell you course
        </motion.h1>}
      </AnimatePresence>
      <Button onClick={()=>{
        setIsAnimate(c => !c)
      }}>animate</Button>
    </div>
  );
}
