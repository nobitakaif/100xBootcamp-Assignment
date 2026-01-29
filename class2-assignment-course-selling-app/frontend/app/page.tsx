"use client"
import Image from "next/image";
import { useEffect, useState } from "react"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  if(!localStorage.getItem("token")){
    router.push("/signup")
    return 
  }
  return (
    <div>
      <Button className="" onClick={()=>{
        localStorage.removeItem("token")
      }}>logout</Button>
    </div>
  );
}
