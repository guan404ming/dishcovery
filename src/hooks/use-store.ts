import { useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import type { InsertStoreReservation } from "@/lib/type";

import handleFetch from "./utils";

export default function useStore() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const createStoreReservation = async ({
    storeDishId,
    quantity,
  }: InsertStoreReservation) => {
    setLoading(true);

    handleFetch({
      data: { storeDishId, quantity, userId: session?.user?.id },
      method: "POST",
      url: "/api/stores/store-reservations",
    });
    setLoading(false);
    router.refresh();
  };

  return {
    createStoreReservation,
    loading,
  };
}
