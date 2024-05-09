"use client";

import { useState } from "react";

import Image from "next/image";

import { PlusCircle, MinusCircle } from "lucide-react";

import { Card } from "@/components/ui/card";

type Purchase = {
  id: number;
  storeName: string;
  price: number;
  state: string;
  photo: string;
};

export function PurchaseCard({
  purchase,
  isCounter,
}: {
  purchase: Purchase;
  isCounter?: boolean;
}) {
  const [amount, setAmount] = useState(0);

  const updateAmount = (type: string) => {
    if (type == "minus") {
      if (amount > 0) {
        setAmount(amount - 1);
      }
    } else [setAmount(amount + 1)];
  };

  return (
    <Card
      key={purchase.storeName}
      className="z-0 flex h-fit max-h-24 w-full cursor-pointer flex-row text-ellipsis text-center md:max-h-24 lg:max-h-56"
    >
      <Image
        src={"/1.jpeg"}
        alt={`${purchase.storeName}`}
        className="aspect-[1/1] object-cover"
        width={100}
        height={100}
      />
      <div className="flex flex-col items-start px-4 py-3 text-left text-xs font-semibold text-foreground">
        <div className="mb-1 flex items-baseline space-x-3">
          <div className="text-lg font-semibold">{purchase.storeName}</div>
          <div className="text-xs font-light text-muted-foreground">
            ${purchase.price}
          </div>
        </div>
        <span className="w-full overflow-hidden text-ellipsis text-wrap text-xs font-normal text-muted-foreground">
          {purchase.state}
        </span>
      </div>

      {isCounter && (
        <div className="mr-4 flex w-full items-center justify-between space-x-2">
          <MinusCircle
            className="h-5 w-5 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              updateAmount("minus");
            }}
          />
          <p className="min-w-4">{amount}</p>
          <PlusCircle
            className="h-5 w-5 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              updateAmount("add");
            }}
          />
        </div>
      )}
    </Card>
  );
}
