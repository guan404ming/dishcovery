"use client";

import useCart from "@/hooks/use-cart";
import ImageCard from "./supplier/image-card";

export default function CartItem({
  id,
  name,
  quantity,
  price,
  image,
}: {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}) {
  const { updateCart } = useCart()
  const handleUpdateCart = async (number: number) => {
    await updateCart(id, number)
  }

  return (
    <ImageCard
      href={`#`}
      counter={({
        amount: quantity,
        setAmount: handleUpdateCart
      })}
      image={image || ""}
    >
      <div className="flex justify-between">
        <h1 className="font-semibold">{name}</h1>
      </div>

      <div className="mt-1 w-full max-w-24 overflow-hidden text-ellipsis text-wrap text-xs text-muted-foreground">
        $ {price}
      </div>
    </ImageCard>
  );
}