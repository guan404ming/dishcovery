import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createStoreReservation = async ({
    storeId,
    dishId,
    quantity,
  }: {
    storeId: number;
    dishId: number;
    quantity: number;
  }) => {
    setLoading(true);

    const res = await fetch("/api/store-reservations", {
      method: "POST",
      body: JSON.stringify({ storeId, dishId, quantity }),
    });

    console.log(res);

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    router.refresh();
    setLoading(false);
  };

  return {
    createStoreReservation,
    loading,
  };
}
