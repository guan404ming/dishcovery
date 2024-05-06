"use client";

import { useState, useRef } from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useBanner from "@/hooks/useBanner";

export default function BannerUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string>("");
  const { createBanner } = useBanner();

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
