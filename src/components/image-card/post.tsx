"use client";

import TimeText from "../time-text";

import type { SelectPost, SelectPostDish } from "@/lib/type";

import ImageCardPrimitive from "./image-card-primitive";

export function Post({
  post,
}: {
  post: SelectPost & { postDishes: SelectPostDish };
}) {
  return (
    <ImageCardPrimitive
      href={`/post/${post.id}`}
      image={post.postDishes?.image}
    >
      <h1 className="line-clamp-2 font-semibold">{post.title}</h1>

      <div className="line-clamp-1 text-sm font-light text-muted-foreground">
        <TimeText date={post.createTime} format="YYYY-MM-DD" />
      </div>

      <div className="mt-1 line-clamp-2 w-full text-xs text-muted-foreground">
        {post.description}
      </div>
    </ImageCardPrimitive>
  );
}
