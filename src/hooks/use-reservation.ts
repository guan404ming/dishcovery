import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import handleFetch from "./utils";

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const finishRservation = async (id: number, quantity: number) => {
    setLoading(true);

    try {
      await handleFetch({
        data: {
          id,
          quantity,
          status: "finished",
        },
        method: "PUT",
        url: "/api/posts/post-reservations",
      });

      setLoading(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating reservation:", error);
    }

    toast("Reservation has finished.");
    router.refresh();
    setLoading(false);
  };

  const cancelRservation = async (id: number) => {
    setLoading(true);

    try {
      await handleFetch({
        data: {
          id,
        },
        method: "DELETE",
        url: "/api/posts/post-reservations",
      });

      setLoading(false);
      router.refresh();
    } catch (error) {
      console.error("Error delete reservation:", error);
    }

    toast("Reservation has been deleted.");
    router.refresh();
    setLoading(false);
  };

  return {
    finishRservation,
    cancelRservation,
    loading,
  };
}
