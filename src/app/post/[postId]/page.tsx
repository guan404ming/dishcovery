import { eq } from "drizzle-orm";

import Dish from "@/components/dish";
import GridContainer from "@/components/grid-container";
import TimeText from "@/components/time-text";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { db } from "@/db";
import { postDishes, posts, users } from "@/db/schema";

export default async function Post({ params }: { params: { postId: string } }) {
  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, parseInt(params.postId)))
    .innerJoin(users, eq(posts.userId, users.id))
    .limit(1);

  const dishes = await db.query.postDishes.findMany({
    where: eq(postDishes.postId, parseInt(params.postId)),
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold">
        {post.posts.title}
      </h2>

      <div className="flex gap-4">
        <Avatar className="h-12 w-12 bg-slate-400 lg:h-14 lg:w-14">
          <AvatarFallback>{post.users.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-slate-800">
            {post.users.name}
          </p>
          <span className="text-sm text-slate-400">
            <TimeText date={post.posts.createTime} format="YYYY-MM-DD" />
            {" @"}
            {post.posts.location}
          </span>
        </div>
      </div>

      <GridContainer>
        {dishes.map((dish) => (
          <Dish key={dish.id} dish={dish} />
        ))}
      </GridContainer>

      <div>
        <text className="line-clamp-3 text-slate-600">
          {post.posts.description}
        </text>
      </div>
    </>
  );
}
