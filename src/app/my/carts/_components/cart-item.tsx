"use client";

import ImageCardPrimitive from "@/components/image-card/image-card-primitive";
import useCart from "@/hooks/use-cart";

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
  const { updateCart } = useCart();
  const handleUpdateCart = async (number: number) => {
    await updateCart(id, number);
  };

  return (
    <ImageCardPrimitive
      counter={{
        amount: quantity,
        setAmount: handleUpdateCart,
      }}
      image={image}
    >
      <div className="flex justify-between">
        <h1 className="line-clamp-2 font-semibold">{name}</h1>
      </div>

      <div className="text-sm text-muted-foreground">$ {price}</div>
    </ImageCardPrimitive>
  );
}
