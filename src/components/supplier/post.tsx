import type { SelectPost } from "@/lib/type";

import ImageCard from "./image-card";

export function Post({
  post,
  isCounter,
}: {
  post: SelectPost;
  isCounter?: boolean;
}) {
  return (
    <ImageCard href={`post/${post.id}`} isCounter={isCounter}>
      <div className="mb-1 flex flex-col space-y-0.5">
        <div>{post.title}</div>
        <div className="text-xs font-light text-muted-foreground">
          Remaining: 100
        </div>
      </div>
      <span className="w-full overflow-hidden text-ellipsis text-wrap text-xs font-normal text-muted-foreground">
        {post.description}
      </span>
    </ImageCard>
  );
}
