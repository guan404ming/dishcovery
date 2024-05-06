"use client";

import { useState, useRef } from "react";

import Image from "next/image";

import type { PutBlobResult } from "@vercel/blob";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
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

          const response = await fetch(`/api/banners?filename=${file.name}`, {
            method: "POST",
            body: file,
          });

          const newBlob = (await response.json()) as PutBlobResult;
          setBlob(newBlob);
        }}
        className="grid gap-2"
      >
        <Input id="picture" type="file" ref={inputFileRef} required />
        <Button
          type="submit"
          className="w-full"
        >
          Upload
        </Button>
      </form>

      {blob && (
        <Image
          src={blob.url}
          alt={""}
          width={100}
          height={100}
          className="aspect-auto w-full border object-cover"
        />
      )}
    </>
  );
}
