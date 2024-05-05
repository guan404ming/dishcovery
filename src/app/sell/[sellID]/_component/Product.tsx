"use client"
import { Button } from "@/components/ui/button"
import DialogMessage from "@/components/DialogMessage";  
import { useState } from "react";

type postProps = {
    image: string;
    image1: string;
    image2: string;
    productName: string;
    cost: string;
    remainAmount: number;
    comment: string;
  };

export default function Product({image, image1, image2, productName, cost, remainAmount, comment}:postProps) {
  const [save, setSave] = useState(false)
  const [reserve, setReserve] = useState(false)
  return (
    <>
      <div className="flex gap-4">
        <div className="w-[40%] md:w-[40%]">
          <div className="h-full md:h-[230px] lg:h-[275px]">
            <img src={image} className="w-full h-full object-cover rounded-xl md:rounded-2xl lg:rounded-3xl"></img>
          </div>
        </div>
        <div className="hidden md:block w-[20%] ">
          <div className="flex flex-col gap-4">
            <img src={image1} className="h-[108px] lg:h-[130px] object-cover rounded-lg md:rounded-xl lg:rounded-2xl"></img>
            <img src={image2} className="h-[108px] lg:h-[130px] object-cover rounded-lg md:rounded-xl lg:rounded-2xl"></img>
          </div>
        </div>
        <div className="hidden md:block w-[30%] ml-2">
          <div className="flex justify-between items-center">
            <p className="font-bold text-xl md:text-3xl lg:text-5xl">{productName}</p>
            <p className="text-lg md:text-xl lg:text-2xl">${cost}</p>
          </div>
          <p className="text-slate-600 font-medium text-sm md:text-xl lg:text-2xl md:leading-10 lg:leading-loose">Remaining : {remainAmount}</p>
          <text className="text-slate-600 text-sm md:text-xl lg:text-2xl line-clamp-3 md-leading-8 lg-leading-10">{comment}</text>
          <div className="flex w-[60%] md:w-[40%] gap-4 mt-2">
            <Button variant="outline" className="h-8 md:h-12 font-bold text-lg bg-gray-300" onClick={() => setSave(true)}>Cart</Button>
            <Button variant="outline" className="h-8 md:h-12 font-bold text-lg bg-gray-300" onClick={() => setReserve(true)}>Reserve</Button>
          </div>  

          <DialogMessage type={"Add to Cart"} open={save} setOpen={setSave} />
          <DialogMessage type={"Reserve"} open={reserve} setOpen={setReserve} />
        
        </div>  

        <div className="md:hidden w-[60%] md:w-[40%]">
          <div className="flex justify-between items-center">
            <p className="font-bold text-xl md:text-3xl lg:text-5xl">{productName}</p>
            <p className="text-lg md:text-xl lg:text-2xl">${cost}</p>
          </div>
          <p className="text-slate-600 font-medium text-sm md:text-xl lg:text-2xl md:leading-10 lg:leading-loose">Remaining : {remainAmount}</p>
          <text className="text-slate-600 text-sm md:text-xl lg:text-2xl line-clamp-3 md-leading-8 lg-leading-10">{comment}</text>
        </div>      
      </div>

      <div className="flex md:hidden ">
        <div className="w-[40%] md:w-[60%]">
          <div className="flex mt-[-10px] md:mt-0 gap-2 md:gap-4">
            <img src={image1} className="w-[43%] h-[40px] mt-2 rounded-lg md:rounded-xl lg:rounded-2xl"></img>
            <img src={image2} className="w-[43%] h-[40px] mt-2 rounded-lg md:rounded-xl lg:rounded-2xl"></img>
          </div>
        </div>
        <div className="flex w-[60%] md:w-[40%] gap-4 ml-4">
          <Button variant="outline" className="h-8 md:h-12 bg-gray-300" onClick={() => setSave(true)}>Cart</Button>
          <Button variant="outline" className="h-8 md:h-12 bg-gray-300" onClick={() => setReserve(true)}>Reserve</Button>
        </div> 

        <DialogMessage type={"Add to Cart"} open={save} setOpen={setSave} />
        <DialogMessage type={"Reserve"} open={reserve} setOpen={setReserve} />     
      </div>

       
    </>
  );
}