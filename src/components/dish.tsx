"use client";

import { useState } from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { SelectPostDish, SelectStoreDish } from "@/lib/type";
import { cn } from "@/lib/utils";

import ReservationDialog from "./reservation-dialog";

export default function Dish({
  dish,
}: {
  dish: SelectPostDish | SelectStoreDish;
}) {
  const [save, setSave] = useState(false);
  const [reserve, setReserve] = useState(false);

  return (
    <>
      <div className="flex w-full justify-between md:max-w-screen-sm">
        <div className="grid w-56 min-w-[120px] grid-cols-3 gap-2">
          {[0, 1, 2].map((image, index) => (
            <Image
              key={index}
              src={"/1.jpeg"}
              className={cn(
                "aspect-square w-full rounded object-cover",
                `${index === 0 ? "col-span-3" : "col-span-1"}`,
              )}
              width={100}
              height={100}
              alt={index.toString()}
            />
          ))}
        </div>

        <div className="flex w-full flex-col justify-between px-4">
          <div className="flex w-full flex-col">
            <div className="flex justify-between">
              <h1 className="font-semibold">{dish.name}</h1>
              <span className="text-sm">
                {dish.price !== 0 ? `$${dish.price}` : "免費"}
              </span>
            </div>

            <div className="text-xs font-light text-muted-foreground">
              Remaining: {dish.quantity}
            </div>
            <span className="my-2 h-16 w-full overflow-hidden text-ellipsis text-wrap text-xs text-muted-foreground">
              {dish.description}
            </span>
          </div>

          <div className="flex space-x-2">
            <Button
              className="h-8 w-20 text-xs"
              onClick={() => {
                setSave(!save);
              }}
            >
              Cart
            </Button>
            <Button
              className="h-8 w-20 text-xs"
              onClick={() => {
                setReserve(!reserve);
              }}
            >
              Reserve
            </Button>
          </div>
        </div>
      </div>
      <Separator className="md:hidden" />
      <ReservationDialog
        title="Cart"
        open={save}
        onOpenChange={setSave}
        postDishId={dish.id}
      />
      <ReservationDialog
        title="Reservation"
        open={reserve}
        onOpenChange={setReserve}
        postDishId={dish.id}
      />
    </>
  );
}
