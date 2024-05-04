"use client"
import { ChevronLeft, SeparatorVertical } from "lucide-react";
import { BellPlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Product from "./_component/Product"

const shop = ["Food Store"]
const products = [ 
  {
  id: "1",
  image: "https://images.chinatimes.com/newsphoto/2023-06-13/1024/20230613002377.jpg",
  image1: "https://letsplay.tw/wp-content/uploads/20190630221316_45.jpg",
  image2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8EBFM8hvxZZCu8gc0k7Cm-gDVokueuBa-41Hpqzz3fQ&s",
  productName: "Pizza",
  cost: "1000",
  remainAmount: 2,
  comment: "緊急通知，我們還有少量便當剩餘，現在下單立享折扣 ! 這些美味的便當是用新鮮食材製作的..."
  },
  {
    id: "2",
    image: "https://images.chinatimes.com/newsphoto/2023-06-13/1024/20230613002377.jpg",
    image1: "https://letsplay.tw/wp-content/uploads/20190630221316_45.jpg",
    image2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8EBFM8hvxZZCu8gc0k7Cm-gDVokueuBa-41Hpqzz3fQ&s",
    productName: "Icecream",
    cost: "1000",
    remainAmount: 2,
    comment: "緊急通知，我們還有少量便當剩餘，現在下單立享折扣 ! 這些美味的便當是用新鮮食材製作的..."
    },
];

export default function Sell() {
  
  return (
    <>
      <div className="flex w-full items-center gap-4">
        <ChevronLeft className="p-2 w-10 h-10 cursor-pointer hover:bg-gray-100/50 hover:rounded-full" />
        <p className="grow text-center font-bold text-lg md:text-2xl lg:text-4xl">{shop}</p>
        <BellPlus className="p-2 w-10 h-10 cursor-pointer hover:bg-gray-100/50 hover:rounded-full"/>
      </div>

      <Separator />

      <div className="">
        {products.map((product) => (
          <Product
            key={product.id}
            image={product.image}
            image1={product.image1}
            image2={product.image2}
            productName={product.productName}
            cost={product.cost}
            remainAmount={product.remainAmount}
            comment={product.comment}
          />
        ))}
      </div>
      
    </>
  );
}