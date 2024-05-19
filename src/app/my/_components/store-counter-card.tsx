"use client";

import ImageCardPrimitive from "@/components/image-card/image-card-primitive";
import useStore from "@/hooks/use-store";
import type { SelectStoreDish } from "@/lib/type";

export function StoreCounterCard({
  storeDish,
}: {
  storeDish: SelectStoreDish;
}) {
  const { updateStoreDish } = useStore();
  return (
    <ImageCardPrimitive
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
      <h1 className="line-clamp-2 font-semibold max-w-20">{storeDish.name}</h1>

      <div className="mt-1 line-clamp-3 w-full text-xs text-muted-foreground">
        {storeDish.description}
      </div>
    </ImageCardPrimitive>
  );
}
