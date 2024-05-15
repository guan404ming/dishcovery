"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Card } from "../ui/card";
import { PlusCircle, MinusCircle } from "lucide-react";

import useCart from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

export default function ImageCardCart({
  children,
  href,
  isCounter,
  initAmount,
  image,
  id,
}: {
  children: React.ReactNode;
  href?: string;
  isCounter?: boolean;
  initAmount?: number;
  image?: string;
  id: number;
}) {
  const [amount, setAmount] = useState(initAmount || 0);
  const { updateCart } = useCart();

  const updateAmount = async (type: string) => {
    if (type == "minus") {
      if (amount > 0) {
        setAmount(amount - 1);
        await updateCart(id, amount - 1);
      }
    } else [setAmount(amount + 1)];
    await updateCart(id, amount + 1);
  };

  return (
    <Link href={href || "/"}>
      <Card className="z-0 flex max-h-32 w-full cursor-pointer overflow-hidden text-ellipsis text-center">
        <Image
          src={image || "/1.jpeg"}
          alt="image"
          className="aspect-[1/1] object-cover"
          width={100}
          height={100}
        />

        <div className="flex w-full justify-between">
          <div className="flex flex-col px-4 py-3 text-left">{children}</div>

          <div
            className={cn(
              "mr-4 flex items-center justify-between space-x-2",
              !isCounter && "hidden",
            )}
          >
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
        </div>
      </Card>
    </Link>
  );
}
