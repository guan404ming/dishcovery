"use client";

import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { SelectPost } from "@/lib/type";

export default function CartPostItem({ post }: { post: SelectPost }) {
  const router = useRouter();

  return (
    <div className="w-full space-y-2 border p-4">
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarFallback>{post.title.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="line-clamp-1">{post.title}</p>
          <span className="line-clamp-1 block text-sm font-light text-muted-foreground">
            @{post.location}
          </span>
        </div>
      </div>

      <Button
        className="block w-full"
        onClick={() => router.push(`/my/cart/post/${post.id}`)}
      >
        View Cart
      </Button>
      <Button
        variant={"outline"}
        className="block w-full"
        onClick={() => router.push(`/post/${post.id}`)}
      >
        View Post
      </Button>
    </div>
  );
}
