"use client";

import { useState } from "react";
import DialogMessage from "@/components/dialog-message";
import { Button } from "@/components/ui/button";

type postProps = {
  image: string;
  image1: string;
  image2: string;
  productName: string;
  cost: string;
  remainAmount: number;
  comment: string;
};

export default function Product({
  image,
  image1,
  image2,
  productName,
  cost,
  remainAmount,
  comment,
}: postProps) {
  const [save, setSave] = useState(false);
  const [reserve, setReserve] = useState(false);
  return (
    <>
      <div className="flex gap-4">
        <div className="w-[40%] md:w-[40%]">
          <div className="h-full md:h-[230px] lg:h-[275px]">
            <img
              src={image}
              className="h-full w-full rounded-xl object-cover md:rounded-2xl lg:rounded-3xl"
            ></img>
          </div>
        </div>
        <div className="hidden w-[20%] md:block ">
          <div className="flex flex-col gap-4">
            <img
              src={image1}
              className="h-[108px] rounded-lg object-cover md:rounded-xl lg:h-[130px] lg:rounded-2xl"
            ></img>
            <img
              src={image2}
              className="h-[108px] rounded-lg object-cover md:rounded-xl lg:h-[130px] lg:rounded-2xl"
            ></img>
          </div>
        </div>
        <div className="ml-2 hidden w-[30%] md:block">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold md:text-3xl lg:text-5xl">
              {productName}
            </p>
            <p className="text-lg md:text-xl lg:text-2xl">${cost}</p>
          </div>
          <p className="text-sm font-medium text-slate-600 md:text-xl md:leading-10 lg:text-2xl lg:leading-loose">
            Remaining : {remainAmount}
          </p>
          <text className="md-leading-8 lg-leading-10 line-clamp-3 text-sm text-slate-600 md:text-xl lg:text-2xl">
            {comment}
          </text>
          <div className="mt-2 flex w-[60%] gap-4 md:w-[40%]">
            <Button
              variant="outline"
              className="h-8 bg-gray-300 text-lg font-bold md:h-12"
              onClick={() => setSave(true)}
            >
              Cart
            </Button>
            <Button
              variant="outline"
              className="h-8 bg-gray-300 text-lg font-bold md:h-12"
              onClick={() => setReserve(true)}
            >
              Reserve
            </Button>
          </div>

          <DialogMessage type={"Add to Cart"} open={save} setOpen={setSave} />
          <DialogMessage type={"Reserve"} open={reserve} setOpen={setReserve} />
        </div>

        <div className="w-[60%] md:hidden md:w-[40%]">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold md:text-3xl lg:text-5xl">
              {productName}
            </p>
            <p className="text-lg md:text-xl lg:text-2xl">${cost}</p>
          </div>
          <p className="text-sm font-medium text-slate-600 md:text-xl md:leading-10 lg:text-2xl lg:leading-loose">
            Remaining : {remainAmount}
          </p>
          <text className="md-leading-8 lg-leading-10 line-clamp-3 text-sm text-slate-600 md:text-xl lg:text-2xl">
            {comment}
          </text>
        </div>
      </div>

      <div className="flex md:hidden ">
        <div className="w-[40%] md:w-[60%]">
          <div className="mt-[-10px] flex gap-2 md:mt-0 md:gap-4">
            <img
              src={image1}
              className="mt-2 h-[40px] w-[43%] rounded-lg md:rounded-xl lg:rounded-2xl"
            ></img>
            <img
              src={image2}
              className="mt-2 h-[40px] w-[43%] rounded-lg md:rounded-xl lg:rounded-2xl"
            ></img>
          </div>
        </div>
        <div className="ml-4 flex w-[60%] gap-4 md:w-[40%]">
          <Button
            variant="outline"
            className="h-8 bg-gray-300 md:h-12"
            onClick={() => setSave(true)}
          >
            Cart
          </Button>
          <Button
            variant="outline"
            className="h-8 bg-gray-300 md:h-12"
            onClick={() => setReserve(true)}
          >
            Reserve
          </Button>
        </div>

        <DialogMessage type={"Add to Cart"} open={save} setOpen={setSave} />
        <DialogMessage type={"Reserve"} open={reserve} setOpen={setReserve} />
      </div>
    </>
  );
}
