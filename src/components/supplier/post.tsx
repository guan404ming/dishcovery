import TimeText from "../time-text";

import type { SelectPost, SelectPostDish } from "@/lib/type";

import ImageCard from "./image-card";

export function Post({
  post,
  counter,
}: {
  post: SelectPost & { postDishes: SelectPostDish };
  counter?: { amount: number; setAmount: (number: number) => Promise<void> };
}) {
  return (
    <ImageCard
      href={`/post/${post.id}`}
      image={post.postDishes?.image}
      className="border-none shadow-none"
      counter={counter}
    >
      <h1 className="line-clamp-2 font-semibold">{post.title}</h1>

      <div className="text-sm font-light text-muted-foreground">
        <TimeText date={post.createTime} format="YYYY-MM-DD" />
      </div>

      <div className="mt-1 line-clamp-3 w-full text-xs text-muted-foreground">
        {post.description}
      </div>
    </ImageCard>
  );
}
