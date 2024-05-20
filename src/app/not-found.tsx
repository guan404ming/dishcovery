"use client";

import { HeartCrack } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center space-y-4 text-center text-xl font-semibold">
      <HeartCrack size={40} />
      <p>Page not found</p>
    </div>
  );
}
