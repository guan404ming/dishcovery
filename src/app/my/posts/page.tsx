import { getServerSession } from "next-auth/next";

import AddDialog from "../_components/add-dialog";
import { eq } from "drizzle-orm";

import GridContainer from "@/components/grid-container";
import PostDish from "@/components/image-card/post-dish";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { authOptions } from "@/lib/auth-options";

export default async function MyReservationsPage() {
  const session = await getServerSession(authOptions);
  if (!session) return <div>Unauthorized</div>;

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
        <AddDialog type="Post"></AddDialog>
      </div>

      <GridContainer>
        {postList.map((post, index) => (
          <PostDish key={index} postDish={post.postDishes} isAuthor isCounter />
        ))}
      </GridContainer>
    </>
  );
}
