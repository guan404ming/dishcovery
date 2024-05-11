"use client";

import { useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";
import { BellPlus } from "lucide-react";

import { Separator } from "@/components/ui/separator";

const shop = ["Food Store"];

export default function Store() {
  const router = useRouter();
  return (
    <>
      <div className="flex w-full items-center justify-between text-center">
        <ChevronLeft
          className="h-4 w-4 cursor-pointer"
          onClick={() => router.back()}
        />
        <h1 className="text-center text-xl font-semibold">{shop}</h1>
        <BellPlus className="h-4 w-4 cursor-pointer" />
      </div>

      <Separator />

      {/* <div className="flex flex-col max-md:space-y-4 md:grid md:grid-cols-2">
        {products.map((product) => (
          <Dish key={product.id} dish={product} />
        ))}
      </div> */}
    </>
  );
}
