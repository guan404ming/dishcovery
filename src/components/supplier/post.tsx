import TimeText from "../time-text";

import type { SelectPost, SelectPostDish } from "@/lib/type";

import ImageCard from "./image-card";

export function Post({
  post,
  isCounter,
}: {
  post: SelectPost & { postDishes: SelectPostDish };
  isCounter?: boolean;
}) {
  return (
    <ImageCard
      href={`/post/${post.id}`}
      isCounter={isCounter}
      image={post.postDishes?.image || ""}
    >
      <div className="flex justify-between">
        <h1 className="font-semibold">{post.title}</h1>
      </div>

      <div className="text-xs font-light text-muted-foreground">
        <TimeText date={post.createTime} format="YYYY-MM-DD" />
      </div>

      <div className="mt-1 w-full max-w-24 overflow-hidden text-ellipsis text-wrap text-xs text-muted-foreground">
        {post.description}
      </div>
    </ImageCard>
  );
}
