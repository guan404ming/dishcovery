"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UnitCounter from "@/components/unit-counter";

const products = [
  {
    id: "1",
    image:
      "https://images.chinatimes.com/newsphoto/2023-06-13/1024/20230613002377.jpg",
    productName: "Pizza",
    cost: "1000",
    time: "9:30",
    amount: 1,
  },
  {
    id: "2",
    image: "https://letsplay.tw/wp-content/uploads/20190630221316_45.jpg",
    productName: "Pizza",
    cost: "1000",
    time: "9:30",
    amount: 1,
  },
  {
    id: "3",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8EBFM8hvxZZCu8gc0k7Cm-gDVokueuBa-41Hpqzz3fQ&s",
    productName: "Pizza",
    cost: "1000",
    time: "9:30",
    amount: 1,
  },
];

export default function Sell() {
  const totalCost = products.reduce((acc, product) => {
    const cost = parseFloat(product.cost);
    return acc + cost * product.amount;
  }, 0);
  return (
    <>
      <p className="text-xl font-bold">Cart</p>

      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <UnitCounter
            key={product.id}
            image={product.image}
            productName={product.productName}
            cost={product.cost}
            time={product.time}
            amount={product.amount}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold text-slate-600">
          Total{"  "}${totalCost}
        </p>
        <Button>Confirm</Button>
      </div>

      <Separator />
    </>
  );
}
