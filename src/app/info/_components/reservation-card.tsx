"use client";

import ImageCard from "@/components/supplier/image-card";

export function ReservationCard({
  name,
  price,
  quantity,
  status,
  isCounter,
}: {
  name: string;
  price: number;
  quantity: number;
  status: string;
  isCounter?: boolean;
}) {
  return (
    <ImageCard isCounter={isCounter} href="#" initAmount={quantity}>
      <div className="mb-1 flex items-baseline space-x-3">
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-xs font-light text-muted-foreground">
          ${price * quantity}
        </div>
      </div>
      <span className="w-full overflow-hidden text-ellipsis text-wrap text-xs font-normal text-muted-foreground">
        {status}
      </span>
    </ImageCard>
  );
}
