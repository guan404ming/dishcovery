"use client";

import ImageCard from "@/components/supplier/image-card";

export function ReservationCard({
  name,
  price,
  quantity,
  status,
  image,
}: {
  name: string;
  price: number;
  quantity: number;
  image: string;
  status: string;
}) {
  return (
    <ImageCard href="#" image={image}>
      <h1 className="line-clamp-2 font-semibold">{name}</h1>
      <span className="text-muted-foreground text-sm">
        ${price * quantity} · {status}
      </span>
    </ImageCard>
  );
}
