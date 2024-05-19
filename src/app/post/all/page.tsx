import GridContainer from "@/components/grid-container";
import { Post } from "@/components/image-card/post";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";

export default async function AllPostPage() {
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
