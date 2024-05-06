import { useState } from "react";

import { useRouter } from "next/navigation";

import { upload } from "@vercel/blob/client";

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createBanner = async ({
    userId,
    file,
  }: {
    userId: number;
    file: File;
  }) => {
    setLoading(true);

    const blob = await upload(`banners/${file.name}`, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    });

    const res = await fetch("/api/banners", {
      method: "POST",
      body: JSON.stringify({ userId, url: blob.url }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    router.refresh();
    setLoading(false);
    return blob.url;
  };

  return {
    createBanner,
    loading,
  };
}
