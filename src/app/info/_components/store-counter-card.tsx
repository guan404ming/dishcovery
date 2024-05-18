import ImageCard from "@/components/supplier/image-card";
import type { SelectStoreDish } from "@/lib/type";

export function StoreCard({
  storeDish,
  counter,
}: {
  storeDish: SelectStoreDish;
  counter?: { amount: number; setAmount: (number: number) => Promise<void> };
}) {
  return (
    <ImageCard
      href={`/reservation/${storeDish.id}`}
      image={storeDish.image}
      className="border-none shadow-none"
      counter={counter}
    >
      <h1 className="line-clamp-2 font-semibold">{storeDish.name}</h1>

      <div className="mt-1 line-clamp-3 w-full text-xs text-muted-foreground">
        {storeDish.description}
      </div>
    </ImageCard>
  );
}
