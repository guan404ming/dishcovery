"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { PlusCircle, MinusCircle } from "lucide-react";
import { toast } from "sonner";

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
    setAmount?: (number: number) => Promise<void>;
    setAmountMinus?: (number: number) => Promise<void>;
    setAmountPlus?: (number: number) => Promise<void>;
    maxAmount?: number;
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
          className="aspect-square flex-shrink-0 rounded border object-cover"
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
            <div className="mr-4 flex flex-grow-0 items-center justify-between space-x-2">
              <MinusCircle
                className="h-5 w-5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (counter.amount - 1 < 0) {
                    toast("The number should be between 1 and 5.");
                  } else {
                    if (counter.setAmount)
                      counter.setAmount(counter.amount - 1);
                    if (counter.setAmountMinus) {
                      counter.setAmountMinus(counter.amount - 1);
                    }
                  }
                }}
              />
              <p className="min-w-4">{counter.amount}</p>
              <PlusCircle
                className="h-5 w-5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    counter.maxAmount !== undefined &&
                    counter.maxAmount === 0
                  ) {
                    toast(`The dish is sold out.`);
                  } else {
                    if (counter.setAmount)
                      counter.setAmount(counter.amount + 1);
                    if (counter.setAmountPlus) {
                      counter.setAmountPlus(counter.amount + 1);
                    }
                  }
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
