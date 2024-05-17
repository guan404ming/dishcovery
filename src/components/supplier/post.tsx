import TimeText from "../time-text";

import type { SelectPost, SelectPostDish } from "@/lib/type";

import ImageCard from "./image-card";

export function Post({
  post,
}: {
  post: SelectPost & { postDishes: SelectPostDish };
}) {

  return (
    <ImageCard href={`/post/${post.id}`} image={post.postDishes?.image} className="border-none shadow-none">
      <h1 className="line-clamp-2 font-semibold">{post.title}</h1>

      <div className="text-sm font-light text-muted-foreground">
        <TimeText date={post.createTime} format="YYYY-MM-DD" />
      </div>

      <div className="mt-1 w-full max-w-24 overflow-hidden text-ellipsis text-wrap text-xs text-muted-foreground">
        {post.description}
      </div>
    </ImageCard>
  );
}
