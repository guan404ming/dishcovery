"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import useBanner from "@/hooks/use-banner";
import { UploadButton } from "@/lib/uploadthing";

export default function AdminBannerPage() {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
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

      <UploadButton
        className="w-full text-black"
        endpoint="imageUploader"
        appearance={{ button: "bg-primary w-full" }}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setUrl(res[0].url);
          createBanner({ url: res[0].url, userId: session?.user?.id });
        }}
        onUploadError={(error: Error) => {
          console.error("Error uploading file: ", error);
        }}
      />

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
