"use client";

import { Button } from "@/components/ui/button";
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

  return <Button onClick={() => handleConfirm()}>Confirm</Button>;
}

export default ConfirmButton;
