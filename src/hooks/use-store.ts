"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import type { InsertStoreDish, InsertStoreReservation } from "@/lib/type";

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

    await handleFetch({
      data: { storeDishId, quantity, userId: session?.user?.id },
      method: "POST",
      url: "/api/stores/store-reservations",
    });

    toast("Store reservation has been created.");
    setLoading(false);
  };

  const deleteStoreReservation = async (id: number) => {
    setLoading(true);

    await handleFetch({
      data: { id },
      method: "DELETE",
      url: `/api/stores/store-reservations`,
    });

    toast("Store reservation has been deleted.");
    setLoading(false);
  };

  const updateStoreReservation = async ({
    id,
    quantity,
    status,
  }: InsertStoreReservation) => {
    setLoading(true);

    await handleFetch({
      data: { id, quantity, status },
      method: "PUT",
      url: "/api/stores/store-reservations",
    });

    toast("Post reservation has been updated.");
    setLoading(false);
    router.refresh();
  };

  const updateStoreDish = async ({
    id,
    quantity,
    storeId,
    name,
    price,
    description,
    image,
  }: InsertStoreDish) => {
    setLoading(true);

    await handleFetch({
      data: { id, quantity, storeId, name, price, description, image },
      method: "PUT",
      url: "/api/stores/store-dishes",
    });

    toast("Post reservation has been updated.");
    setLoading(false);
    router.refresh();
  };

  return {
    updateStoreReservation,
    deleteStoreReservation,
    createStoreReservation,
    updateStoreDish,
    loading,
  };
}
