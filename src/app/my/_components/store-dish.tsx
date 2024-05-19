"use client";

import ImageCardPrimitive from "@/components/image-card/image-card-primitive";
import useStore from "@/hooks/use-store";
import type { SelectStoreDish } from "@/lib/type";

export default function StoreDish({
  storeDish,
}: {
  storeDish: SelectStoreDish;
}) {
  const { updateStoreDish } = useStore();
  return (
    <ImageCardPrimitive
      href={`/reservation/${storeDish.id}`}
      image={storeDish.image}
      counter={{
        amount: storeDish.quantity,
        setAmount: async (number: number) => {
          await updateStoreDish({ ...storeDish, quantity: number });
        },
      }}
    >
      <h1 className="line-clamp-2 max-w-20 font-semibold">{storeDish.name}</h1>

      <div className="mt-1 line-clamp-3 w-full text-xs text-muted-foreground">
        {storeDish.description}
      </div>
    </ImageCardPrimitive>
  );
}
