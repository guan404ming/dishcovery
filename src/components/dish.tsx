"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import type { SelectPostDish, SelectStoreDish } from "@/lib/type";

import ReservationDialog from "./reservation-dialog";
import ImageCard from "./supplier/image-card";
import { Button } from "./ui/button";

export default function Dish({
  dish,
}: {
  dish: SelectPostDish | SelectStoreDish;
}) {
  const [cart, setCart] = useState(false);
  const [reserve, setReserve] = useState(false);

  return (
    <>
      <ImageCard
        image={dish.image}
        className="relative border-none shadow-none"
      >
        <Button
          size={"icon"}
          variant="outline"
          className="absolute bottom-2 left-[88px] h-8 w-8 rounded-full border"
          // onClick={() => setCart(!cart)}
          onClick={() => setReserve(!reserve)}
        >
          <Plus className="h-3 w-3" strokeWidth={3} />
        </Button>
        <div className="flex flex-col">
          <h1 className="line-clamp-2 font-semibold">{dish.name}</h1>

          <div className="flex items-center space-x-2 text-sm">
            <span>
              {dish.price !== 0 ? `$${dish.price}` : "free"} · Remaining:{" "}
              {dish.quantity}
            </span>
          </div>

          <span className="my-1 line-clamp-2 text-sm text-muted-foreground">
            {dish.description}
          </span>
        </div>
      </ImageCard>
      <ReservationDialog
        title="Cart"
        open={cart}
        onOpenChange={setCart}
        dishId={dish.id}
      />
      <ReservationDialog
        title="Reservation"
        open={reserve}
        onOpenChange={setReserve}
        dishId={dish.id}
      />
    </>
  );
}
