import { useState } from "react";

import { useRouter } from "next/navigation";

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

    const res = await fetch("/api/banners", {
      method: "POST",
      body: JSON.stringify({ userId, url: url }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    router.refresh();
    setLoading(false);
  };

  return {
    createBanner,
    loading,
  };
}
