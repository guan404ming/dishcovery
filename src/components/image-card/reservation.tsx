"use client";

import { Badge } from "../ui/badge";

import ImageCardPrimitive from "@/components/image-card/image-card-primitive";

export default function Reservation({
  name,
  price,
  quantity,
  status,
  image,
  isPost,
  sellerId,
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
  sellerId: number;
}) {
  return (
    <ImageCardPrimitive
      href={(isPost ? "/post" : "/store") + `/${sellerId}`}
      image={image}
    >
      <h1 className="line-clamp-2 w-full font-semibold">{name}</h1>
      <span className="text-sm text-muted-foreground">
        ${price * quantity} ·{" "}
        <span
          className={`rounded-full px-2 ${status === "finished" ? "bg-green-100 text-green-500" : status === "waiting" ? "bg-orange-100 text-orange-500" : status === "cancelled" ? "bg-red-100 text-red-500" : "bg-purple-100 text-purple-500"}`}
        >
          {status}
        </span>
      </span>

      <Badge className="mx-2 shadow-sm" variant={"outline"}>
        {quantity}
      </Badge>
    </ImageCardPrimitive>
  );
}
