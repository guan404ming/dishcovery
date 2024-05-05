"use client"
import { Button } from "@/components/ui/button"
import DialogMessage from "@/components/DialogMessage";  
import { useState } from "react";

type postProps = {
    image: string;
    productName: string;
    time: string;
    cost: string;
    amount: number;
  };

export default function Product({image, productName, time, cost, amount}:postProps) {
    const updateAmount = (type:string) => {
        if (type=="minus") {
            if (Amount>0) {
              setAmount(Amount-1)
            }
        } else [
            setAmount(Amount+1)
        ]
      };
    
  const [Amount, setAmount] = useState(amount)
  return (
    <>
      <div className="flex h-[80px] md:h-[120px] lg:h-[200px] rounded-lg bg-white drop-shadow gap-4">
        <div className="h-full w-[30%]">
            <img src={image} className="h-full w-full object-cover rounded-l-lg"></img>
        </div>
        <div className="w-[40%] md:w-[50%] lg:w-[60%] flex flex-col gap-2 justify-center">
            <p className="font-bold text-lg md:text-2xl lg:text-4xl">{productName}{"  "}<span className="font-medium text-sm md:text-base lg:text-xl text-slate-400">${cost}</span></p>
            <p className="font-medium text-slate-600 text-sm md:text-lg lg:text-xl">At {time} AM</p>
        </div>
        <div className="w-[30%] md:w-[10%] flex gap-2 items-center">
            <Button className="w-4 h-4 md:w-8 md:h-8 md:text-lg bg-white text-black p-2 rounded-full border-2 border-black hover:bg-slate-200 " onClick={()=>{updateAmount("minus")}}>-</Button>
            <p>{Amount}</p>
            <Button className="w-4 h-4 md:w-8 md:h-8 md:text-lg bg-white text-black p-2 rounded-full border-2 border-black hover:bg-slate-200" onClick={()=>{updateAmount("add")}}>+</Button>
        </div>
      </div>

       
    </>
  );
}