import { ChevronLeft } from "lucide-react";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"

const post = {
  id: "1",
  banner: "https://img.delicious.com.au/aChNQyIi/w759-h506-cfill/del/2015/10/no-churn-ice-cream-four-ways-15139-2.jpg",
  title: "ice cream",
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
  return (
    <>
      <div className="">
        <img src={post.banner}></img>
      </div>

      <div className="flex justify-center">
        <ChevronLeft className="absolute left-[20px]" />
        <p>{post.title}</p>
      </div>

      <div className="flex gap-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback>W</AvatarFallback>
        </Avatar>
        <div>
            <p>{post.user}</p>
            <span>{post.time}</span>
            <span>{" "}</span>
            <span>{post.place}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-[50%] items-stretch">
          <div className="h-full">
            <img src={post.image1} className="h-full object-cover"></img>
          </div>
        </div>
        <div className="w-[50%]">
          <p>{post.user}</p>
          <p>Remaining:{post.remainAmount}</p>
          <text>{post.comment}</text>
        </div>      
      </div>

      <div className="flex">
        <div className="w-[50%]">
          <div className="flex gap-2">
            <img src={post.image2} className="w-[30%]"></img>
            <img src={post.image3} className="w-[30%]"></img>
          </div>
        </div>
        <div className="flex w-[50%] gap-4 ml-4">
          <Button variant="outline">Save</Button>
          <Button variant="outline">Reserve</Button>
        </div>      
      </div>
    </>
  );
}