"use client";

import Image from "next/image";

import { Card } from "@/components/ui/card";

type PurchaseCard = {
  id: number;
  storeName: string;
  price: number;
  state: string;
  photo: string;
};

export function PurchaseCard({
  storeName,
  price,
  state,
  photo,
}: PurchaseCard) {
  return (
    <Card className="m-2 p-2 lg:m-4 lg:p-4">
      <div className="flex gap-x-4">
        <Image src={`/${photo}`} width={96} height={96} alt={storeName} />
        <div>
          <div className="flex items-center gap-x-8">
            <p className="text-lg font-bold lg:text-2xl">{storeName}</p>
            <p className="text-md lg:text-lg">$ {price}</p>
          </div>
          <div className="text-md pt-4 font-normal text-muted-foreground lg:text-lg">
            {state}
          </div>
        </div>
      </div>
    </Card>
  );
}
