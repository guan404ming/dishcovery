import { eq } from "drizzle-orm";
import { ChevronLeft } from "lucide-react";

import TimeText from "@/components/time-text";
import { Banner } from "@/components/banner";
import Dish from "@/components/dish";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { db } from "@/db";
import { postDishes, posts, users } from "@/db/schema";
import GridContainer from "@/components/grid-container";

export default async function Post({ params }: { params: { postId: string } }) {
  const bannerList = await db.query.banners.findMany();
  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, parseInt(params.postId)))
    .innerJoin(users, eq(posts.userId, users.id))
    .limit(1)

  const dishes = await db.query.postDishes.findMany({
    where: eq(postDishes.postId, parseInt(params.postId)),
  });

  if (!post || !dishes) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Banner bannerList={bannerList} />

      <div className="flex items-center justify-center">
        <ChevronLeft className="absolute left-5 h-4 w-4 cursor-pointer hover:rounded-full hover:bg-gray-100/50" />
        <p className="text-lg font-bold md:text-2xl lg:text-4xl">
          {post.posts.title}
        </p>
      </div>

      <div className="flex gap-4">
        <Avatar className="h-12 w-12 bg-slate-400 lg:h-14 lg:w-14">
          <AvatarFallback>W</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-slate-800 md:text-lg lg:text-xl">
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
        {
          dishes.map((dish) => (
            <Dish key={dish.id} dish={dish} />
          ))
        }
      </GridContainer>

      <div>
        <text className="line-clamp-3 text-sm text-slate-600">
          {post.posts.description}
        </text>
      </div>
    </>
  );
}
