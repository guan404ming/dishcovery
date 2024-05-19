import { getServerSession } from "next-auth";
import Link from "next/link";

import { eq } from "drizzle-orm";


import GridContainer from "@/components/grid-container";
import TimeText from "@/components/time-text";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { postDishes, posts, users } from "@/db/schema";
import { authOptions } from "@/lib/auth-options";
import Dish from "@/components/image-card/dish";

export default async function Post({ params }: { params: { postId: string } }) {
  const session = await getServerSession(authOptions);
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
      <div className="grid gap-1 text-center">
        <h1 className="text-2xl font-bold">{post.posts.title}</h1>

        <div className="text-sm text-gray-500">
          <TimeText date={post.posts.createTime} format="YYYY-MM-DD" /> ·{" "}
          {post.posts.location}
        </div>
      </div>

      <Separator />

      <GridContainer>
        {dishes.map((dish) => (
          <Link
            href={
              session?.user.id === post.users.id
                ? `/reservation/${dish.id}`
                : "#"
            }
            key={dish.id}
          >
            <Dish key={dish.id} dish={dish} />
          </Link>
        ))}
      </GridContainer>

      <Separator />

      <p className="line-clamp-3 text-slate-600">{post.posts.description}</p>
    </>
  );
}
