import { useState } from "react";

import { useRouter } from "next/navigation";

export default function usePost() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createPostReservation = async ({
    postDishId,
    quantity,
  }: {
    postDishId: number;
    quantity: number;
  }) => {
    setLoading(true);

    const res = await fetch("/api/post-reservations", {
      method: "POST",
      body: JSON.stringify({ postDishId, quantity }),
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
    createPostReservation,
    loading,
  };
}
