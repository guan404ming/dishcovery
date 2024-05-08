"use client";

import { ChevronLeft } from "lucide-react";
import { BellPlus } from "lucide-react";

import Dish from "@/components/dish";
import { Separator } from "@/components/ui/separator";

const shop = ["Food Store"];
const products = [
  {
    id: "1",
    images: [
      "https://images.chinatimes.com/newsphoto/2023-06-13/1024/20230613002377.jpg",
      "https://letsplay.tw/wp-content/uploads/20190630221316_45.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8EBFM8hvxZZCu8gc0k7Cm-gDVokueuBa-41Hpqzz3fQ&s",
    ],

    name: "Pizza",
    price: 1000,
    quantity: 2,
    description:
      "緊急通知，我們還有少量便當剩餘，現在下單立享折扣 ! 這些美味的便當是用新鮮食材製作的...",
  },
  {
    id: "2",
    images: [
      "https://images.chinatimes.com/newsphoto/2023-06-13/1024/20230613002377.jpg",
      "https://letsplay.tw/wp-content/uploads/20190630221316_45.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8EBFM8hvxZZCu8gc0k7Cm-gDVokueuBa-41Hpqzz3fQ&s",
    ],

    name: "Pizza",
    price: 1000,
    quantity: 2,
    description:
      "緊急通知，我們還有少量便當剩餘，現在下單立享折扣 ! 這些美味的便當是用新鮮食材製作的...緊急通知，我們還有少量便當剩餘，現在下單立享折扣 ! 這些美味的便當是用新鮮食材製作的...緊急通知，我們還有少量便當剩餘，現在下單立享折扣 ! 這些美味的便當是用新鮮食材製作的...緊急通知，我們還有少量便當剩餘，現在下單立享折扣 ! 這些美味的便當是用新鮮食材製作的...緊急通知，我們還有少量便當剩餘，現在下單立享折扣 ! 這些美味的便當是用新鮮食材製作的...",
  },
];

export default function Store() {
  return (
    <>
      <div className="flex w-full items-center justify-between text-center">
        <ChevronLeft className="h-4 w-4 cursor-pointer" />
        <h1 className="text-center text-xl font-semibold">{shop}</h1>
        <BellPlus className="h-4 w-4 cursor-pointer" />
      </div>

      <Separator />

      <div className="flex flex-col max-md:space-y-4 md:grid md:grid-cols-2">
        {products.map((product) => (
          <Dish key={product.id} dish={product} />
        ))}
      </div>
    </>
  );
}
