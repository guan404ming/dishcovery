"use client";

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
  cartItem: { storeDish: { id: number }; quantity: number; id: number }[];
}) {
  const { createStoreReservation } = useStore();
  const { removeFromCart } = useCart();

  async function handleConfirm() {
    cartItem.forEach(async (cartItem) => {
      await createStoreReservation({
        storeDishId: cartItem.storeDish.id,
        quantity: cartItem.quantity,
      });
      await removeFromCart(cartItem.id);
    });
  }

  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <Button>Confirm</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={() => handleConfirm()}>Submit</Button>
            <DrawerClose>
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
