"use client"
import { ChevronLeft } from "lucide-react";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import DialogMessage from "@/components/DialogMessage";  
import { useState } from "react";

const post = {
  id: "1",
  banner: "https://img.delicious.com.au/aChNQyIi/w759-h506-cfill/del/2015/10/no-churn-ice-cream-four-ways-15139-2.jpg",
  title: "Get Some Pizza !!",
  user: "Prof. Chen",
  time: "20240502",
  place: "@NTU操場",
  image1: "https://images.chinatimes.com/newsphoto/2023-06-13/1024/20230613002377.jpg",
  image2: "https://letsplay.tw/wp-content/uploads/20190630221316_45.jpg",
  image3: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8EBFM8hvxZZCu8gc0k7Cm-gDVokueuBa-41Hpqzz3fQ&s",
  productName: "Pizza",
  remainAmount: 2,
  comment: "緊急通知，我們還有少量便當剩餘，現在下單立享折扣 ! 這些美味的便當是用新鮮食材製作的..."


};

export default function Post() {
  const [save, setSave] = useState(false)
  const [reserve, setReserve] = useState(false)
  return (
    <>
      <div className="w-full">
        <img src={post.banner} className="rounded-2xl w-full h-auto max-h-[150px] md:max-h-[250px] lg:max-h-[350px] object-cover"></img>
      </div>

      <div className="flex justify-center items-center">
        <ChevronLeft className="absolute left-[20px] p-2 w-12 h-12 cursor-pointer hover:bg-gray-100/50 hover:rounded-full" />
        <p className="font-bold text-lg md:text-2xl lg:text-4xl">{post.title}</p>
      </div>

      <div className="flex gap-4">
        <Avatar className="h-12 lg:h-14 w-12 lg:w-14 bg-slate-400">
          <AvatarFallback>W</AvatarFallback>
        </Avatar>
        <div>
            <p className="font-semibold text-slate-800 md:text-lg lg:text-xl">{post.user}</p>
            <span className="text-sm text-slate-400 md:text-base lg:text-lg">{post.time}</span>
            <span className="text-sm text-slate-400 md:text-base lg:text-lg">{" "}</span>
            <span className="text-sm text-slate-400 md:text-base lg:text-lg">{post.place}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-[40%] md:w-[40%] items-stretch">
          <div className="h-full">
            <img src={post.image1} className="h-full object-cover rounded-xl md:rounded-2xl lg:rounded-3xl"></img>
          </div>
        </div>
        <div className="hidden md:block w-[20%]">
          <div className="flex flex-col gap-4">
            <img src={post.image2} className="rounded-lg md:rounded-xl lg:rounded-2xl"></img>
            <img src={post.image3} className="rounded-lg md:rounded-xl lg:rounded-2xl"></img>
          </div>
        </div>
        <div className="hidden md:block w-[30%] ml-2">
          <p className="font-bold text-xl md:text-3xl lg:text-5xl">{post.productName}</p>
          <p className="text-slate-600 font-medium text-sm md:text-xl lg:text-2xl md:leading-10 lg:leading-loose">Remaining : {post.remainAmount}</p>
          <text className="text-slate-600 text-sm md:text-xl lg:text-2xl line-clamp-3 md-leading-8 lg-leading-10">{post.comment}</text>
          <div className="flex w-[60%] md:w-[40%] gap-4 mt-4">
            <Button variant="outline" className="h-8 md:h-12 font-bold text-lg bg-gray-300" onClick={() => setSave(true)}>Cart</Button>
            <Button variant="outline" className="h-8 md:h-12 font-bold text-lg bg-gray-300" onClick={() => setReserve(true)}>Reserve</Button>
          </div>  

          <DialogMessage type={"Add to Cart"} open={save} setOpen={setSave} />
          <DialogMessage type={"Reserve"} open={reserve} setOpen={setReserve} />
        
        </div>  

        <div className="md:hidden w-[60%] md:w-[40%]">
          <p className="font-bold text-xl md:text-3xl lg:text-5xl">{post.productName}</p>
          <p className="text-slate-600 font-medium text-sm md:text-xl lg:text-2xl md:leading-10 lg:leading-loose">Remaining : {post.remainAmount}</p>
          <text className="text-slate-600 text-sm md:text-xl lg:text-2xl line-clamp-3 md-leading-8 lg-leading-10">{post.comment}</text>
        </div>      
      </div>

      <div className="flex md:hidden">
        <div className="w-[40%] md:w-[60%]">
          <div className="flex mt-[-10px] md:mt-0 gap-2 md:gap-4">
            <img src={post.image2} className="w-[43%] rounded-lg md:rounded-xl lg:rounded-2xl"></img>
            <img src={post.image3} className="w-[43%] rounded-lg md:rounded-xl lg:rounded-2xl"></img>
          </div>
        </div>
        <div className="flex w-[60%] md:w-[40%] gap-4 ml-4">
          <Button variant="outline" className="h-8 md:h-12 bg-gray-300" onClick={() => setSave(true)}>Cart</Button>
          <Button variant="outline" className="h-8 md:h-12 bg-gray-300" onClick={() => setReserve(true)}>Reserve</Button>
        </div>      
        <DialogMessage type={"Add to Cart"} open={save} setOpen={setSave} />
        <DialogMessage type={"Reserve"} open={reserve} setOpen={setReserve} />
      </div>

      <div className="">
        <text className="text-slate-600 text-sm md:text-xl lg:text-2xl line-clamp-3 md-leading-8 lg-leading-10">{post.comment}</text>
      </div>  
    </>
  );
}