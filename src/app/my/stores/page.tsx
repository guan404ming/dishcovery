import { getServerSession } from "next-auth/next";

import { eq } from "drizzle-orm";

import GridContainer from "@/components/grid-container";
import StoreDish from "@/components/image-card/store-dish";
import { db } from "@/db";
import { stores } from "@/db/schema";
import { authOptions } from "@/lib/auth-options";

export default async function MyStoresPage() {
  const session = await getServerSession(authOptions);
  if (!session) return <div>Unauthorized</div>;

  const store = await db.query.stores.findFirst({
    with: {
      storeDishes: {
        orderBy: (storeDishes, { asc }) => [asc(storeDishes.id)],
      },
    },
    where: eq(stores.userId, session?.user.id),
  });

  if (!store) return <div>No store found</div>;

  return (
    <>
      <h1 className="text-xl font-semibold">My Store Dishes</h1>
      <GridContainer>
        {store.storeDishes.map((storeDish, index) => (
          <StoreDish storeDish={storeDish} key={index} isAuthor isCounter />
        ))}
      </GridContainer>
    </>
  );
}
