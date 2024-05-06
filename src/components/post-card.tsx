"use client";

import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { PlusCircle, MinusCircle } from "lucide-react";

import { Card } from "./ui/card";

export interface Post {
  title: string;
  content: string;
  picUrl: string;
}

export function PostCard({
  post,
  isCounter,
}: {
  post: Post;
  isCounter?: boolean;
}) {
  const router = useRouter();
  const [amount, setAmount] = useState(0);

  const updateAmount = (type: string) => {
    if (type == "minus") {
      if (amount > 0) {
        setAmount(amount - 1);
      }
    } else [setAmount(amount + 1)];
  };

  return (
    <Card
      key={post.title}
      className="z-0 flex h-fit max-h-24 w-full cursor-pointer flex-row text-ellipsis text-center md:max-h-24 lg:max-h-56"
      onClick={() => {
        router.push("post/123");
      }}
    >
      <Image
        src={"/1.jpeg"}
        alt={`${post.title}`}
        className="aspect-[1/1] object-cover"
        width={100}
        height={100}
      />
      <div className="flex flex-col items-start truncate px-4 py-3 text-left text-xs font-semibold text-foreground">
        <div className="mb-1 flex flex-col space-y-0.5">
          <div>{post.title}</div>
          <div className="text-xs font-light text-muted-foreground">
            Remaining: 100{" "}
          </div>
        </div>
        <span className="block truncate text-wrap text-left font-normal text-muted-foreground">
          {post.content}
        </span>
      </div>
      
      {isCounter && (
        <div className="mx-2 flex items-center space-x-1">
          <MinusCircle
            className="h-4 w-4 cursor-pointer"
            onClick={() => {
              updateAmount("minus");
            }}
          />
          <p>{amount}</p>
          <PlusCircle
            className="h-4 w-4 cursor-pointer"
            onClick={() => {
              updateAmount("add");
            }}
          />
        </div>
      )}
    </Card>
  );
}
