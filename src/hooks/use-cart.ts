import { useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import handleFetch from "./utils";

export default function useCart() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const updateCart = async (id: number, quantity: number) => {
    await handleFetch({
      data: { id, quantity },
      method: "PUT",
      url: `/api/carts`,
      successMessage: "Cart item quantity has been updated.",
      setLoading,
    });
    router.refresh();
  };

  const addToCart = async (storeDishId: number, quantity: number) => {
    await handleFetch({
      data: { storeDishId, quantity, userId: session?.user?.id },
      method: "POST",
      url: `/api/carts`,
      successMessage: "Cart item has been added.",
      setLoading,
    });
    router.refresh();
  };

  const removeFromCart = async (id: number) => {
    await handleFetch({
      data: { id },
      method: "DELETE",
      url: `/api/carts`,
      successMessage: "Cart item has been removed.",
      setLoading,
    });
    router.refresh();
  };

  return {
    addToCart,
    removeFromCart,
    updateCart,
    loading,
  };
}
