"use client";

import ImageCard from "@/components/supplier/image-card";
import useStore from "@/hooks/use-store";
import type { SelectStoreDish } from "@/lib/type";

export function StoreCounterCard({
  storeDish,
}: {
  storeDish: SelectStoreDish;
}) {
  const { updateStoreDish } = useStore();
  return (
    <ImageCard
      href={`/reservation/${storeDish.id}`}
      image={storeDish.image}
      className="border-none shadow-none"
      counter={{
        amount: storeDish.quantity,
        setAmount: async (number: number) => {
          await updateStoreDish({ ...storeDish, quantity: number });
        },
      }}
    >
      <h1 className="line-clamp-2 font-semibold">{storeDish.name}</h1>

      <div className="mt-1 line-clamp-3 w-full text-xs text-muted-foreground">
        {storeDish.description}
      </div>
    </ImageCard>
  );
}
