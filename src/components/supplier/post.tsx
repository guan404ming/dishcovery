import TimeText from "../time-text";

import type { SelectPost, SelectPostDish } from "@/lib/type";

import ImageCard from "./image-card";

import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

export async function Post({
  post,
}: {
  post: SelectPost & { postDishes: SelectPostDish };
}) {
  const session = await getServerSession(authOptions);
  const isAuthor = post.userId === session?.user.id;
  
  return (
    <ImageCard href={isAuthor ? `/reservation/${post.id}` : `/post/${post.id}`} image={post.postDishes?.image}>
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
