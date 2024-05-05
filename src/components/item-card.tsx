"use client";

import { Card } from "@/components/ui/card";

import Image from "next/image";

import { AiOutlineMinusCircle } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";

type ItemCard = {
    id: number;
    name: string;
    price: number;
    description: string;
    remaining: number;
    photo: string;
  };

export function ItemCard({ id, name, price, description, remaining, photo }: ItemCard) {
    return (
        <Card className="m-2 lg:m-4 p-2 lg:p-4">
            <div className="flex gap-x-4">
                <Image
                    src={`/${photo}`}
                    width={96}
                    height={96}
                    alt={name}
                />
                <div className="flex-grow">
                    <div className="flex items-center gap-x-2 lg:gap-x-8">
                        <p className="text-lg lg:text-2xl font-bold">{name}</p>
                        <p className="text-md lg:text-lg">$ {price}</p>
                    </div>
                    <div className="text-md lg:text-lg font-normal text-muted-foreground pt-2 lg:pt-4">
                        {description.slice(0, 20)}...
                    </div>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                    <p className="text-xs lg:text-lg"><AiOutlineMinusCircle/></p>
                    <p className="text-xs lg:text-lg">{remaining}</p>
                    <p className="text-xs lg:text-lg"><AiOutlinePlusCircle/></p>
                </div>
            </div>
        </Card>
    );
  }