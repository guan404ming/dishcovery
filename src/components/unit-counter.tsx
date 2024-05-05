"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

type postProps = {
  image: string;
  productName: string;
  time: string;
  cost: string;
  amount: number;
};

export default function UnitCounter({
  image,
  productName,
  time,
  cost,
  amount,
}: postProps) {
  const updateAmount = (type: string) => {
    if (type == "minus") {
      if (Amount > 0) {
        setAmount(Amount - 1);
      }
    } else [setAmount(Amount + 1)];
  };

  const [Amount, setAmount] = useState(amount);
  return (
    <>
      <div className="flex h-[80px] gap-4 rounded-lg bg-white drop-shadow md:h-[120px] lg:h-[200px]">
        <div className="h-full w-[30%]">
          <img
            src={image}
            className="h-full w-full rounded-l-lg object-cover"
          />
        </div>
        <div className="flex w-[40%] flex-col justify-center gap-2 md:w-[50%] lg:w-[60%]">
          <p className="text-lg font-bold md:text-2xl lg:text-4xl">
            {productName}
            {"  "}
            <span className="text-sm font-medium text-slate-400 md:text-base lg:text-xl">
              ${cost}
            </span>
          </p>
          <p className="text-sm font-medium text-slate-600 md:text-lg lg:text-xl">
            At {time} AM
          </p>
        </div>
        <div className="flex w-[30%] items-center gap-2 md:w-[10%]">
          <Button
            className="h-4 w-4 rounded-full border-2 border-black bg-white p-2 text-black hover:bg-slate-200 md:h-8 md:w-8 md:text-lg "
            onClick={() => {
              updateAmount("minus");
            }}
          >
            -
          </Button>
          <p>{Amount}</p>
          <Button
            className="h-4 w-4 rounded-full border-2 border-black bg-white p-2 text-black hover:bg-slate-200 md:h-8 md:w-8 md:text-lg"
            onClick={() => {
              updateAmount("add");
            }}
          >
            +
          </Button>
        </div>
      </div>
    </>
  );
}
