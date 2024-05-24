"use client";

import ImageCardPrimitive from "@/components/image-card/image-card-primitive";
import usePost from "@/hooks/use-post";
import useStore from "@/hooks/use-store";

export default function Reservation({
  name,
  price,
  quantity,
  status,
  image,
  id,
  isPost,
  dishQuantity,
  dishId,
}: {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  status: "waiting" | "confirmed" | "finished" | "cancelled";
  isPost: boolean;
  dishQuantity: number;
  dishId: number;
}) {
  const { updatePostReservation } = usePost();
  const { updateStoreReservation } = useStore();

  return (
    <ImageCardPrimitive
      image={image}
      counter={
        status !== "finished"
          ? {
              amount: quantity,
              maxAmount: dishQuantity,
              setAmountMinus: async (number: number) => {
                if (isPost) {
                  await updatePostReservation({
                    id,
                    quantity: number,
                    status,
                    dishQuantity: dishQuantity + 1,
                    postDishId: dishId,
                  });
                } else {
                  await updateStoreReservation({
                    id,
                    quantity: number,
                    status,
                    dishQuantity: dishQuantity + 1,
                    storeDishId: dishId,
                  });
                }
              },
              setAmountPlus: async (number: number) => {
                if (isPost) {
                  await updatePostReservation({
                    id,
                    quantity: number,
                    status,
                    dishQuantity: dishQuantity - 1 < 0 ? 0 : dishQuantity - 1,
                    postDishId: dishId,
                  });
                } else {
                  await updateStoreReservation({
                    id,
                    quantity: number,
                    status,
                    dishQuantity: dishQuantity - 1 < 0 ? 0 : dishQuantity - 1,
                    storeDishId: dishId,
                  });
                }
              },
            }
          : undefined
      }
    >
      <h1 className="line-clamp-2 w-full font-semibold">{name}</h1>
      <span className="text-sm text-muted-foreground">
        ${price * quantity} · {status}
      </span>
    </ImageCardPrimitive>
  );
}
