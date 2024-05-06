"use client";

import Image from "next/image";

import { PlusCircle, MinusCircle } from "lucide-react";

import { Card } from "@/components/ui/card";

type ItemCard = {
  id: number;
  name: string;
  price: number;
  description: string;
  remaining: number;
  photo: string;
};

export function ItemCard({
  name,
  price,
  description,
  remaining,
  photo,
}: ItemCard) {
  return (
    <Card className="m-2 p-2 lg:m-4 lg:p-4">
      <div className="flex gap-x-4">
        <Image src={`/${photo}`} width={96} height={96} alt={name} />
        <div className="flex-grow">
          <div className="flex items-center gap-x-2 lg:gap-x-8">
            <p className="text-lg font-bold lg:text-2xl">{name}</p>
            <p className="text-md lg:text-lg">$ {price}</p>
          </div>
          <div className="text-md pt-2 font-normal text-muted-foreground lg:pt-4 lg:text-lg">
            {description.slice(0, 20)}...
          </div>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <p className="text-xs lg:text-lg">
            <MinusCircle />
          </p>
          <p className="text-xs lg:text-lg">{remaining}</p>
          <p className="text-xs lg:text-lg">
            <PlusCircle />
          </p>
        </div>
      </div>
    </Card>
  );
}
