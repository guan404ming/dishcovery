import { getServerSession } from "next-auth/next";

import AddPostDialog from "../_components/add-post-dialog";
import { eq } from "drizzle-orm";

import UnauthorizedPage from "@/app/unauthorized";
import GridContainer from "@/components/grid-container";
import PostDish from "@/components/image-card/post-dish";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { authOptions } from "@/lib/auth-options";

export default async function MyPostsPage() {
  const session = await getServerSession(authOptions);
  if (!session) return <UnauthorizedPage />;

  const postList = await db.query.posts.findMany({
    limit: 5,
    with: {
      postDishes: true,
    },
    where: eq(posts.userId, session?.user.id),
    orderBy: (posts, { desc }) => [desc(posts.createTime)],
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">My Posts</h1>
        <AddPostDialog />
      </div>

      {postList.map((post) => (
        <div key={post.id} className="space-y-4 rounded border p-5 shadow">
          <div className="text-lg font-semibold">{post.title}</div>
          <Separator className="md:hidden" />
          <GridContainer>
            {post.postDishes.map((postDish, index) => (
              <PostDish key={index} postDish={postDish} isAuthor isCounter />
            ))}
          </GridContainer>
        </div>
      ))}
    </>
  );
}
