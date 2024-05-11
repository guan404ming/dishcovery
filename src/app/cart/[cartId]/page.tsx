"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Cart() {
  // const totalCost = mockPost.reduce((acc, product) => {
  //   const cost = parseFloat(product.cost);
  //   return acc + cost * product.amount;
  // }, 0);

  return (
    <>
      <p className="text-xl font-bold">Cart</p>

      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold text-slate-600">
          Total{"  "}${1000}
        </p>
        <Button>Confirm</Button>
      </div>

      <Separator />
    </>
  );
}
