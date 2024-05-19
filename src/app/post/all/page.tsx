import GridContainer from "@/components/grid-container";
import { Post } from "@/components/supplier/post";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";

export default async function AllPost() {
  const postList = await db.query.posts.findMany({
    with: { postDishes: true },
  });

  return (
    <>
      <span className="text-xl font-semibold">All Posts</span>
      <GridContainer>
        {postList.map((post) => (
          <>
            <Post key={post.id} post={post} />
            <Separator className="md:hidden"></Separator>
          </>
        ))}
      </GridContainer>
    </>
  );
}
