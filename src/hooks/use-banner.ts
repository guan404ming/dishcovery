import { useState } from "react";

import { useRouter } from "next/navigation";

import handleFetch from "./utils";

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createBanner = async ({
    url,
    userId,
  }: {
    url: string;
    userId: number;
  }) => {
    await handleFetch({
      data: { userId, url },
      method: "POST",
      url: "/api/banners",
      successMessage: "Banner has been created.",
      setLoading,
    });
    router.refresh();
  };

  return {
    createBanner,
    loading,
  };
}
