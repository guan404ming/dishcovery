"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useCart from "@/hooks/use-cart";
import useStore from "@/hooks/use-store";

function ConfirmButton({
  cartItem,
}: {
  cartItem: {
    storeDishes: { id: number; quantity: number };
    carts: { quantity: number; id: number };
  }[];
}) {
  const { createStoreReservation } = useStore();
  const { removeFromCart } = useCart();
  const router = useRouter();

  async function handleConfirm() {
    cartItem.forEach(async (cartItem) => {
      await createStoreReservation({
        storeDishId: cartItem.storeDishes.id,
        quantity: cartItem.carts.quantity,
        dishQuantity: cartItem.storeDishes.quantity,
      });
      await removeFromCart(cartItem.carts.id, true);
    });
    router.push("/my/reservations");
  }

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Confirm</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={() => handleConfirm()}>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline" className="block w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ConfirmButton;
