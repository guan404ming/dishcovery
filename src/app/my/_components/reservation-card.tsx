"use client";

import ImageCard from "@/components/supplier/image-card";
import usePost from "@/hooks/use-post";
import useStore from "@/hooks/use-store";

export function ReservationCard({
  name,
  price,
  quantity,
  status,
  image,
  id,
  isPost,
}: {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  status: "waiting" | "confirmed" | "finished" | "cancelled";
  isPost: boolean;
}) {
  const { updatePostReservation } = usePost();
  const { updateStoreReservation } = useStore();

  return (
    <ImageCard
      href="#"
      image={image}
      counter={{
        amount: quantity,
        setAmount: async (number: number) => {
          if (isPost) {
            await updatePostReservation({ id, quantity: number, status });
          } else {
            await updateStoreReservation({ id, quantity: number, status });
          }
        },
      }}
    >
      <h1 className="line-clamp-2 w-full max-w-20 font-semibold">{name}</h1>
      <span className="text-sm text-muted-foreground">
        ${price * quantity} · {status}
      </span>
    </ImageCard>
  );
}
