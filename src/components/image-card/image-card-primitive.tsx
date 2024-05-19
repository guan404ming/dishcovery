"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { PlusCircle, MinusCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export default function ImageCardPrimitive({
  children,
  href,
  counter,
  image,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  counter?: {
    amount: number;
    setAmount: (number: number) => Promise<void>;
  };
  image: string;
  className?: string;
}) {
  const router = useRouter();
  const handleRouting = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <>
      <Card
        onClick={() => handleRouting()}
        className={cn(
          className,
          "z-0 flex h-[120px] flex-nowrap text-center shadow-none max-md:border-none",
          href && "cursor-pointer",
        )}
      >
        <Image
          src={image}
          alt="image"
          className="aspect-square rounded border object-cover flex-shrink-0"
          width={120}
          height={120}
        />

        <div className="flex w-full justify-between">
          <div
            className={cn(
              "px-4 py-2 text-left",
              counter && " max-[400px]:max-w-24",
            )}
          >
            {children}
          </div>

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
      <Separator className="md:hidden" />
    </>
  );
}
