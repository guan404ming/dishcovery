"use client";

import { useState, useRef } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useBanner from "@/hooks/useBanner";
import { Skeleton } from "@/components/ui/skeleton";

export default function BannerUploadPage() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string>("");
  const { createBanner } = useBanner();

  if (status === "loading") {
    return (
      <div className="flex items-center space-x-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <>
      <span className="text-center text-xl font-semibold">Upload Banner</span>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];

          const url = await createBanner({
            userId: 1,
            file,
          });

          setUrl(url);
        }}
        className="grid gap-2"
      >
        <Input id="picture" type="file" ref={inputFileRef} required />
        <Button type="submit" className="w-full">
          Upload
        </Button>
      </form>

      {url && (
        <Image
          src={url}
          alt={""}
          width={100}
          height={100}
          className="aspect-auto w-full border object-cover"
        />
      )}
    </>
  );
}
