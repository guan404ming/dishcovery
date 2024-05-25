"use client";

import { Trash } from "lucide-react";

import ImageCardPrimitive from "@/components/image-card/image-card-primitive";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useCart from "@/hooks/use-cart";

export default function CartItem({
  id,
  name,
  quantity,
  price,
  image,
  dishQuantity,
  isPost,
}: {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  dishQuantity: number;
  isPost?: boolean;
}) {
  const { updateCart, removeFromCart } = useCart();

  return (
    <ImageCardPrimitive
      counter={{
        amount: quantity,
        setAmount: async (number: number) =>
          await updateCart(id, number, isPost),
        maxAmount: dishQuantity - quantity,
      }}
      image={image}
      className="relative"
    >
      <div className="flex justify-between">
        <h1 className="line-clamp-2 font-semibold">{name}</h1>
      </div>

      <div className="text-sm text-muted-foreground">$ {price}</div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            size={"icon"}
            variant="outline"
            className="absolute bottom-2 left-20 h-8 w-8 rounded-full border"
          >
            <Trash className="h-3 w-3" strokeWidth={3} />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Remove Item</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant={"destructive"}
              onClick={() => {
                removeFromCart(id, false, isPost);
              }}
            >
              Delete
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="block w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </ImageCardPrimitive>
  );
}
