"use client";

import { useRouter } from "next/navigation";

import { UserRoundX } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();
  router.push("/");

  return (
    <div className="flex flex-grow flex-col items-center justify-center space-y-4 text-center text-xl font-semibold">
      <UserRoundX size={40} />
      <p>Unauthorized</p>
    </div>
  );
}
