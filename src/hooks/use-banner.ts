import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

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
    setLoading(true);

    await handleFetch({
      data: { userId, url },
      method: "POST",
      url: "/api/banners",
    });

    toast("Banner has been created.");
    router.refresh();
    setLoading(false);
  };

  return {
    createBanner,
    loading,
  };
}
