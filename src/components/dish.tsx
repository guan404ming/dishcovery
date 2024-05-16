"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { SelectPostDish, SelectStoreDish } from "@/lib/type";

import ReservationDialog from "./reservation-dialog";
import ImageCard from "./supplier/image-card";

export default function Dish({
  dish,
}: {
  dish: SelectPostDish | SelectStoreDish;
}) {
  const [save, setSave] = useState(false);
  const [reserve, setReserve] = useState(false);

  return (
    <>
      <ImageCard image={dish.image}>
        <div className="flex flex-col">
          <h1 className="line-clamp-1 font-semibold">{dish.name}</h1>

          <div className="flex items-center space-x-2">
            <span className="text-sm">
              {dish.price !== 0 ? `$${dish.price}` : "free"}
            </span>
            <div className="text-xs font-light text-muted-foreground">
              Remaining: {dish.quantity}
            </div>
          </div>

          <span className="my-2 line-clamp-1 text-xs text-muted-foreground">
            {dish.description}
          </span>
        </div>

        <div className="flex space-x-2">
          <Button
            className="h-7 w-20 text-xs"
            onClick={() => {
              setSave(!save);
            }}
          >
            Cart
          </Button>
          <Button
            className="h-7 w-20 text-xs"
            onClick={() => {
              setReserve(!reserve);
            }}
          >
            Reserve
          </Button>
        </div>
      </ImageCard>
      <ReservationDialog
        title="Cart"
        open={save}
        onOpenChange={setSave}
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
