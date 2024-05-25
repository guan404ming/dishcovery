"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Pen, Plus } from "lucide-react";

import ReservationDialog from "@/components/dialog/reservation-dialog";
import ImageCardPrimitive from "@/components/image-card/image-card-primitive";
import { Button } from "@/components/ui/button";
import useStore from "@/hooks/use-store";
import type { SelectStoreDish } from "@/lib/type";

export default function StoreDish({
  storeDish,
  isAuthor,
  isCounter,
  originalQuantity,
}: {
  storeDish: SelectStoreDish;
  isAuthor?: boolean;
  isCounter?: boolean;
  originalQuantity?: number;
}) {
  const { updateStoreDish } = useStore();
  const [cart, setCart] = useState(false);
  const router = useRouter();

  return (
    <>
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
        setOpen={!isAuthor ? setCart : undefined}
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
          <Button
            size={"icon"}
            variant="outline"
            className="absolute bottom-2 left-20 h-8 w-8 rounded-full border"
          >
            {originalQuantity || <Plus className="h-3 w-3" strokeWidth={3} />}
          </Button>
        )}

        <h1 className="line-clamp-1 font-semibold md:line-clamp-2">
          {storeDish.name}
        </h1>

        <div className="flex items-center space-x-2 text-sm">
          ${storeDish.price} · Remaining: {storeDish.quantity}
        </div>

        <span className="my-1 line-clamp-2 text-sm text-muted-foreground md:line-clamp-2">
          {storeDish.description}
        </span>
      </ImageCardPrimitive>
      <ReservationDialog
        title="Add to Cart"
        open={cart}
        onOpenChange={setCart}
        dishId={storeDish.id}
        dishQuantity={storeDish.quantity}
        defaultQuantity={originalQuantity || 0}
      />
    </>
  );
}
