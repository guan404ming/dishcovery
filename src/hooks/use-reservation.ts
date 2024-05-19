import { useState } from "react";

import { useRouter } from "next/navigation";

import handleFetch from "./utils";

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const finishReservation = async (id: number, quantity: number) => {
    await handleFetch({
      data: { id, quantity, status: "finished" },
      method: "PUT",
      url: "/api/posts/post-reservations",
      successMessage: "Reservation has been finished.",
      setLoading,
    });
    router.refresh();
  };

  const cancelReservation = async (id: number) => {
    await handleFetch({
      data: { id },
      method: "DELETE",
      url: "/api/posts/post-reservations",
      successMessage: "Reservation has been deleted.",
      setLoading,
    });
    router.refresh();
  };

  return {
    finishReservation,
    cancelReservation,
    loading,
  };
}
