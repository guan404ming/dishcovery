import { useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import handleFetch from "./utils";

export default function useCart() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const updateCart = async (id: number, quantity: number) => {
    setLoading(true);

    try {
      await handleFetch({
        data: { id, quantity },
        method: "PUT",
        url: `/api/carts`,
      });

      setLoading(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }

    setLoading(false);
  };

  const addToCart = async (storeDishId: number, quantity: number) => {
    setLoading(true);

    try {
      await handleFetch({
        data: { storeDishId, quantity, userId: session?.user?.id },
        method: "POST",
        url: `/api/carts`,
      });

      setLoading(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }

    setLoading(false);
  };

  const removeFromCart = async (id: number) => {
    setLoading(true);

    try {
      await handleFetch({
        data: { id },
        method: "DELETE",
        url: `/api/carts`,
      });

      setLoading(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }

    setLoading(false);
  };

  return {
    addToCart,
    removeFromCart,
    updateCart,
    loading,
  };
}
