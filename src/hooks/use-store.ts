import { useState } from "react";

import { useSession } from "next-auth/react";

import { toast } from "sonner";

import type { InsertStoreReservation } from "@/lib/type";

import handleFetch from "./utils";

export default function useStore() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const createStoreReservation = async ({
    storeDishId,
    quantity,
  }: InsertStoreReservation) => {
    setLoading(true);

    await handleFetch({
      data: { storeDishId, quantity, userId: session?.user?.id },
      method: "POST",
      url: "/api/stores/store-reservations",
    });

    toast("Store reservation has been created.");
    setLoading(false);
  };

  return {
    createStoreReservation,
    loading,
  };
}
