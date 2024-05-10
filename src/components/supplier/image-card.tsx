"use client";

import { useState } from "react";

import Image from "next/image";

import { Card } from "../ui/card";
import { PlusCircle, MinusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ImageCard({
  children,
  href,
  isCounter,
}: {
  children: React.ReactNode;
  href?: string;
  isCounter?: boolean;
}) {
  const [amount, setAmount] = useState(0);
  const router = useRouter();

  const updateAmount = (type: string) => {
    if (type == "minus") {
      if (amount > 0) {
        setAmount(amount - 1);
      }
    } else [setAmount(amount + 1)];
  };

  return (
    <Card className="z-0 flex max-h-24 w-full cursor-pointer flex-row text-ellipsis text-center" onClick={() => router.push(`${href}`)}>
      <Image
        src={"/1.jpeg"}
        alt="image"
        className="aspect-[1/1] object-cover"
        width={100}
        height={100}
      />

      <div className="flex w-full justify-between">
        <div className="flex flex-col items-start px-4 py-3 text-left text-xs font-semibold text-foreground">
          {children}
        </div>

        {isCounter && (
          <div className="mr-4 flex items-center justify-between space-x-2">
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
      </div>
    </Card>
  );
}
