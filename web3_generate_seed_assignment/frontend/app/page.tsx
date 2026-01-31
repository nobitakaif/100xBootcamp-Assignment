"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {generateMnemonic, mnemonicToSeedSync} from "bip39"
import { Copy } from "lucide-react";

export default function Hero() {
  const [clicked, setClicked] = useState(false);
  const [button, setButton ] = useState(false)
  const [seed, setSeed] = useState<string[] | null>(null);
  const [isCopy, setIsCopy] = useState(false)
  const [isImported, setIsImported] = useState(false)

  function generateSeed(){
    const newSeed = generateMnemonic()
    const words = newSeed.trim().split(/\s+/);
    setClicked(true)
    setSeed(words)
    // setClicked(c=>!c)
    // alert(newSeed)
    // console.log(newSeed)
    // console.log(`mnemonic to seed ${mnemonicToSeedSync(newSeed)}`)
    // const str = newSeed.toString()
    // let currentStr = ""
    // for(let i =0;i<str.length;i++){
    //     if(str[i] == " "){
    //       setSeed((c) => [...c, currentStr])
    //       console.log("before clear currrent string", currentStr)
    //       currentStr = ""
    //     }else{
    //       currentStr += str[i]
    //     }
    // }
    // // if(currentStr.length > 1) {
    // //   setSeed(c => [...c, currentStr])
    // // }
    // console.log("final current str ", currentStr)
    
    // console.log("this is actual str", str)

  }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8 overflow-hidden">
      <AnimatePresence>
        {!clicked && (
          <motion.h1
            initial={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 6,        
              opacity: 0,
              y: -200          
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-6xl font-bold text-black bg-clip-text "
          >
            Create your Web-3 Wallet
          </motion.h1>
        )}
      </AnimatePresence>
      <div className="flex gap-6 flex-col">
        <div className="flex gap-8  justify-center ">
          <motion.button
            layout
            onClick={generateSeed}
            initial = {{scale : 1, opacity : 1}}
            exit={{scale : 6, opacity : 0, y : -200}}
            animate ={{transition : {duration : 0.8, ease : "easeInOut"}, }}
            className="px-6 py-3 rounded-lg bg-white text-black font-semibold"
          >
            Generate new Seed
          </motion.button>
          <AnimatePresence >
            {!button && (
              <motion.button
                className="px-6 py-3 rounded-lg border border-white  boder text-black "
                initial = {{scale : 1, opacity : 1}}
                exit={{scale : 15, opacity : 0, y : -200}}
                animate ={{transition : {duration : 50000, ease : "easeInOut"} }}
                onClick={()=>{
                  setIsImported(true)
                  setClicked(true)
                }}
              >
                Import Seed
              </motion.button>
            )}
           
          </AnimatePresence>
          
      </div>
             <div className="grid grid-cols-3">
            {clicked && Array.from({length:12}).map((el,idx)=>(
              <input placeholder="enter you seed here" key={idx}>
                
              </input>
              
            ))}
           </div>
        
         {seed ? <div className="grid grid-cols-3 gap-3">
            {seed.map((s, index) =>(
            <motion.button key={index} className="border border-black rounded-lg text-center ">
              {s}
            </motion.button>
          ))} 
          </div>: ""}
          
        {seed && <motion.button 
          className="px-4 bg-white rounded-lg border h-10 font-semibold cursor-pointer flex gap-3 items-center justify-center"
          onClick={()=>{
            navigator.clipboard.writeText(JSON.stringify(seed,null, 2))
            setIsCopy(true)
            setTimeout(()=>{
              setIsCopy(false)
            },5000)
          }}
        >
            {isCopy ? "Copied" : "Copy"}
            
        </motion.button>}
      </div>
    </div>
  );
}
