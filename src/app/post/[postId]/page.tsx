import { getServerSession } from "next-auth";

import { desc, eq } from "drizzle-orm";

import { PostMapView } from "@/app/_components/map";
import NotFoundPage from "@/app/not-found";
import GridContainer from "@/components/grid-container";
import PostDish from "@/components/image-card/post-dish";
import TimeText from "@/components/time-text";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { postDishes, posts, users } from "@/db/schema";
import { authOptions } from "@/lib/auth-options";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const session = await getServerSession(authOptions);
  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, parseInt(params.postId)))
    .innerJoin(users, eq(posts.userId, users.id))
    .limit(1);

  const dishes = await db.query.postDishes.findMany({
    where: eq(postDishes.postId, parseInt(params.postId)),
    orderBy: desc(postDishes.id),
  });

  if (!post) {
    return <NotFoundPage />;
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
      <PostMapView post={post.posts} />

      <GridContainer>
        {dishes.map((dish) => (
          <PostDish
            key={dish.id}
            postDish={dish}
            isAuthor={session?.user.id === post.users.id}
          />
        ))}
      </GridContainer>

      <p className="text-slate-600">{post.posts.description}</p>
    </>
  );
}
