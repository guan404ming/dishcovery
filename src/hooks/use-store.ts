"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    await handleFetch({
      data: { storeDishId, quantity, userId: session?.user?.id },
      method: "POST",
      url: "/api/stores/store-reservations",
      successMessage: "Store reservation has been created.",
      setLoading,
    });
    router.refresh();
  };

  const deleteStoreReservation = async (id: number) => {
    await handleFetch({
      data: { id },
      method: "DELETE",
      url: `/api/stores/store-reservations`,
      successMessage: "Store reservation has been deleted.",
      setLoading,
    });
    router.refresh();
  };

  const updateStoreReservation = async ({
    id,
    quantity,
    status,
  }: InsertStoreReservation) => {
    await handleFetch({
      data: { id, quantity, status },
      method: "PUT",
      url: "/api/stores/store-reservations",
      successMessage: "Store reservation has been updated.",
      setLoading,
    });
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
    await handleFetch({
      data: { id, quantity, storeId, name, price, description, image },
      method: "PUT",
      url: "/api/stores/store-dishes",
      successMessage: "Store dish has been updated.",
      setLoading,
    });
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
