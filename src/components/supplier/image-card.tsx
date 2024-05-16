"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Card } from "../ui/card";
import { PlusCircle, MinusCircle } from "lucide-react";

export default function ImageCard({
  children,
  href,
  counter,
  image,
}: {
  children: React.ReactNode;
  href?: string;
  counter?: {
    amount: number;
    setAmount: (number: number) => Promise<void>;
  };
  image: string;
}) {
  const router = useRouter();
  const handleRouting = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <Card
      onClick={() => handleRouting()}
      className="z-0 flex max-h-32 w-full cursor-pointer overflow-hidden text-ellipsis text-center"
    >
      <Image
        src={image}
        alt="image"
        className="aspect-[1/1] object-cover"
        width={100}
        height={100}
      />

      <div className="flex w-full justify-between">
        <div className="flex flex-col px-4 py-3 text-left">{children}</div>

        {counter && (
          <div className="mr-4 flex items-center justify-between space-x-2">
            <MinusCircle
              className="h-5 w-5 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                counter.setAmount(
                  counter.amount - 1 < 0 ? 0 : counter.amount - 1,
                );
              }}
            />
            <p className="min-w-4">{counter.amount}</p>
            <PlusCircle
              className="h-5 w-5 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                counter.setAmount(counter.amount + 1);
              }}
            />
          </div>
        )}
      </div>
    </Card>
  );
}
