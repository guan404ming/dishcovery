"use client";

import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";

import Image from "next/image";

import { Card } from "@/components/ui/card";

type PostCard = {
  title: string;
  context: string;
  remaining: number;
  photo: string;
};

export function PostCard({ title, context, remaining, photo }: PostCard) {
  return (
    <Card className="m-2 p-2 lg:m-4 lg:p-4">
      <div className="flex justify-between gap-x-4">
        <Image src={`/${photo}`} width={96} height={96} alt={title} />
        <div className="flex-grow">
          <div className="flex items-center gap-x-8">
            <p className="text-lg font-bold lg:text-2xl">{title}</p>
          </div>
          <p className="text-md pt-2 font-normal text-muted-foreground lg:pt-4 lg:text-lg">
            {context.slice(0, 20)}...
          </p>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <p className="text-xs lg:text-lg">
            <AiOutlineMinusCircle />
          </p>
          <p className="text-xs lg:text-lg">{remaining}</p>
          <p className="text-xs lg:text-lg">
            <AiOutlinePlusCircle />
          </p>
        </div>
      </div>
    </Card>
  );
}
