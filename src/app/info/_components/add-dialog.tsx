"use client";

import { useRef, useState } from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import usePost from "@/hooks/use-post";
import { UploadButton } from "@/lib/uploadthing";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: string;
};

export default function AddDialog({ open, onOpenChange, type }: DialogProps) {
  const [url, setUrl] = useState<string>("");
  const titleRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const dishNameRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const { createPost } = usePost();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[80%] w-[80%] max-w-[400px] overflow-scroll rounded">
        <DialogHeader>
          <DialogTitle className="flex justify-start text-lg lg:text-xl">
            Add {type}
          </DialogTitle>
        </DialogHeader>

        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="title">標題</Label>
          <Input
            type="title"
            className="rounded-md border border-gray-300 p-2"
            required
            ref={titleRef}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="place">領取地點</Label>
          <Input
            type="place"
            className="rounded-md border border-gray-300 p-2"
            required
            ref={locationRef}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="dishName">餐點名稱</Label>
          <Input
            type="dishName"
            className="rounded-md border border-gray-300 p-2"
            required
            ref={dishNameRef}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="quantity">剩餘數量</Label>
          <Input
            type="quantity"
            className="rounded-md border border-gray-300 p-2"
            required
            ref={quantityRef}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="description">商品敘述</Label>
          <Textarea placeholder="寫一些有關餐點的敘述" ref={descriptionRef} />
        </div>

        <UploadButton
          className="w-full text-black"
          endpoint="imageUploader"
          appearance={{ button: "bg-primary w-full" }}
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            setUrl(res[0].url);
          }}
          onUploadError={(error: Error) => {
            console.log(`ERROR! ${error.message}`);
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

        <DialogFooter>
          <Button
            onClick={() => {
              onOpenChange(!open);
              if (
                !titleRef.current?.value ||
                !descriptionRef.current?.value ||
                !locationRef.current?.value ||
                !dishNameRef.current?.value ||
                !quantityRef.current?.value ||
                !url
              )
                return;
              createPost({
                title: titleRef.current?.value,
                description: descriptionRef.current?.value,
                location: locationRef.current?.value,
                name: dishNameRef.current?.value,
                quantity: Number(quantityRef.current?.value),
                image: url,
              });
            }}
          >
            confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
