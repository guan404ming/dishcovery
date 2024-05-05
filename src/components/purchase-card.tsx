"use client";

import { Card } from "@/components/ui/card";

import Image from "next/image";

type PurchaseCard = {
    id: number;
    storeName: string;
    price: number;
    state: string;
    photo: string;
  };

export function PurchaseCard({ id, storeName, price, state, photo }: PurchaseCard) {
    return (
        <Card className="m-2 lg:m-4 p-2 lg:p-4">
            <div className="flex gap-x-4">
                <Image
                    src={`/${photo}`}
                    width={96}
                    height={96}
                    alt={storeName}
                />
                <div>
                    <div className="flex items-center gap-x-8">
                        <p className="text-lg lg:text-2xl font-bold">{storeName}</p>
                        <p className="text-md lg:text-lg">$ {price}</p>
                    </div>
                    <div className="text-md lg:text-lg font-normal text-muted-foreground pt-4">
                        {state}
                    </div>
                </div>
            </div>
        </Card>
    );
  }