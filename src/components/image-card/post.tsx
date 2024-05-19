"use client";

import TimeText from "../time-text";

import usePost from "@/hooks/use-post";
import type { SelectPost, SelectPostDish } from "@/lib/type";

import ImageCardPrimitive from "./image-card-primitive";

export function Post({
  post,
  isCounter,
}: {
  post: SelectPost & { postDishes: SelectPostDish };
  isCounter?: boolean;
}) {
  const { updatePost } = usePost();

  return (
    <ImageCardPrimitive
      href={`/post/${post.id}`}
      image={post.postDishes?.image}
      counter={
        isCounter
          ? {
              amount: post.postDishes.quantity,
              setAmount: async (number: number) => {
                await updatePost(
                  post.id,
                  post.postDishes.id,
                  post.postDishes.name,
                  number,
                  post.postDishes.description,
                  post.postDishes.image,
                );
              },
            }
          : undefined
      }
    >
      <h1 className="line-clamp-2 font-semibold">{post.title}</h1>

      <div className="text-sm font-light text-muted-foreground">
        <TimeText date={post.createTime} format="YYYY-MM-DD" />
      </div>

      <div className="mt-1 line-clamp-3 w-full text-xs text-muted-foreground">
        {post.description}
      </div>
    </ImageCardPrimitive>
  );
}
