import { getServerSession } from "next-auth/next";

import { StoreCounterCard } from "../_components/store-counter-card";
import { eq } from "drizzle-orm";

import GridContainer from "@/components/grid-container";
import { db } from "@/db";
import { stores } from "@/db/schema";
import { authOptions } from "@/lib/auth-options";

export default async function MyStores() {
  const session = await getServerSession(authOptions);
  if (!session) return <div>Unauthorized</div>;

  const storeDishList = await db.query.stores.findFirst({
    with: {
      storeDishes: true,
    },
    where: eq(stores.userId, session?.user.id),
  });

  if (!storeDishList) return <div>No store found</div>;

  return (
    <>
      <h1 className="text-xl font-semibold">My Store Dishes</h1>
      <GridContainer>
        {storeDishList.storeDishes.map((storeDish, index) => (
          <StoreCounterCard storeDish={storeDish} key={index} />
        ))}
      </GridContainer>
    </>
  );
}
