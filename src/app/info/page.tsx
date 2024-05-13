import { getServerSession } from "next-auth";

import { eq } from "drizzle-orm";

import InfoTab from "@/app/info/_components/info-tab";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import {
  postDishes,
  postReservations,
  posts,
  storeDishes,
  storeReservations,
} from "@/db/schema";
import { authOptions } from "@/lib/auth-options";

export default async function Info() {
  const session = await getServerSession(authOptions);
  if (!session) return <div>Unauthorized</div>;

  const postList = await db.query.posts.findMany({
    limit: 5,
    with: {
      postDishes: true,
    },
    where: eq(posts.userId, session?.user.id),
  });

  const postReservationList = await db
    .select({
      postReservations,
      postDishes,
    })
    .from(postReservations)
    .innerJoin(postDishes, eq(postReservations.postDishId, postDishes.id))
    .where(eq(postReservations.userId, session?.user.id));

  const storeReservationList = await db
    .select({
      storeReservations,
      storeDishes,
    })
    .from(storeReservations)
    .innerJoin(storeDishes, eq(storeReservations.storeDishId, storeDishes.id))
    .where(eq(storeReservations.userId, session?.user.id));

  return (
    <>
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={session?.user.image as string} />
          <AvatarFallback>
            {session?.user.name?.slice(0, 1) as string}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg">{session?.user.name}</p>
          <div className="text-xs font-normal text-muted-foreground">
            {session?.user.role}
          </div>
        </div>
      </div>

      <Separator />

      <InfoTab
        postList={postList}
        postReservationList={postReservationList}
        storeReservationList={storeReservationList}
      />
    </>
  );
}
