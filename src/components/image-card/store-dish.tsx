"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Pen, Plus } from "lucide-react";

import ImageCardPrimitive from "@/components/image-card/image-card-primitive";
import ReservationDialog from "@/components/reservation-dialog";
import { Button } from "@/components/ui/button";
import useStore from "@/hooks/use-store";
import type { SelectStoreDish } from "@/lib/type";

export default function StoreDish({
  storeDish,
  isAuthor,
  isCounter,
}: {
  storeDish: SelectStoreDish;
  isAuthor?: boolean;
  isCounter?: boolean;
}) {
  const { updateStoreDish } = useStore();
  const [cart, setCart] = useState(false);
  const router = useRouter();

  return (
    <ImageCardPrimitive
      image={storeDish.image}
      counter={
        isCounter
          ? {
              amount: storeDish.quantity,
              setAmount: async (number: number) => {
                await updateStoreDish({ ...storeDish, quantity: number });
              },
            }
          : undefined
      }
      className="relative"
    >
      {isAuthor ? (
        <Button
          size={"icon"}
          variant="outline"
          className="absolute bottom-2 left-20 h-8 w-8 rounded-full border"
          onClick={() => router.push(`/store/store-dish/${storeDish.id}`)}
        >
          <Pen className="h-3 w-3" strokeWidth={3} />
        </Button>
      ) : (
        <>
          <Button
            size={"icon"}
            variant="outline"
            className="absolute bottom-2 left-20 h-8 w-8 rounded-full border"
            // onClick={() => setCart(!cart)}
            onClick={() => setCart(!cart)}
          >
            <Plus className="h-3 w-3" strokeWidth={3} />
          </Button>
          <ReservationDialog
            title="Cart"
            open={cart}
            onOpenChange={setCart}
            dishId={storeDish.id}
          />
        </>
      )}

      <h1 className="line-clamp-2 font-semibold">{storeDish.name}</h1>

      <div className="mt-1 line-clamp-3 w-full text-xs text-muted-foreground">
        {storeDish.description}
      </div>
    </ImageCardPrimitive>
  );
}
