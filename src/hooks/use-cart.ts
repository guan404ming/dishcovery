import { useState } from "react";

import { useRouter } from "next/navigation";

import handleFetch from "./utils";

export default function useCart() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const updateCart = async (id: number, quantity: number) => {
    setLoading(true);

    try {
      await handleFetch({
        data: { id, quantity },
        method: "PUT",
        url: `/api/cart`,
      });

      setLoading(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }

    setLoading(false);
  };

  return {
    updateCart,
    loading,
  };
}
