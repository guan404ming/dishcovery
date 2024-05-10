import type { SelectPost } from "@/lib/type";

import ImageCard from "./image-card";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { postDishes } from "@/db/schema";

export async function Post({
  post,
  isCounter,
}: {
  post: SelectPost;
  isCounter?: boolean;
}) {
  const dishesQuantity = await db.query.postDishes.findMany({
    where: eq(postDishes.postId, post.id),
    columns: {
      quantity: true,
    }
  })

  return (
    <ImageCard href={`post/${post.id}`} isCounter={isCounter}>
      <div className="mb-1 flex flex-col space-y-0.5">
        <div>{post.title}</div>
        <div className="text-xs font-light text-muted-foreground">
          Remaining: {dishesQuantity.reduce((acc, curr) => acc + curr.quantity, 0)}
        </div>
      </div>
      <span className="w-full overflow-hidden text-ellipsis text-wrap text-xs font-normal text-muted-foreground">
        {post.description}
      </span>
    </ImageCard>
  );
}
