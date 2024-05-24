import { getServerSession } from "next-auth";
import Image from "next/image";

import { and, eq } from "drizzle-orm";

import { StoreMapView } from "@/app/_components/map";
import GridContainer from "@/components/grid-container";
import StoreDish from "@/components/image-card/store-dish";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import {
  carts,
  storeCollections,
  storeDishes,
  stores,
  users,
} from "@/db/schema";
import { authOptions } from "@/lib/auth-options";

import SaveButton from "./_components/save-button";

export default async function StorePage({
  params,
}: {
  params: { storeId: string };
}) {
  const session = await getServerSession(authOptions);

  const [store] = await db
    .select()
    .from(stores)
    .where(eq(stores.id, parseInt(params.storeId)))
    .innerJoin(users, eq(stores.userId, users.id))
    .limit(1);

  const dishes = await db.query.storeDishes.findMany({
    where: eq(storeDishes.storeId, parseInt(params.storeId)),
    with: {
      cart: {
        where: eq(carts.userId, session?.user.id as number),
      },
    },
  });

  const storeCollection = await db.query.storeCollections.findFirst({
    where: and(
      eq(storeCollections.storeId, parseInt(params.storeId)),
      eq(storeCollections.userId, session?.user.id as number),
    ),
  });

  return (
    <>
      <div className="relative w-full">
        <SaveButton
          storeId={store.stores.id}
          storeCollection={storeCollection}
        />
        <Image
          width={"600"}
          height={"600"}
          src={store.stores.image}
          alt="banner"
          className="aspect-[4/1] w-full rounded object-cover"
        />
      </div>

      <div className="grid gap-1 text-center">
        <h1 className="text-2xl font-bold">{store.stores.name}</h1>

        <div className="text-sm text-gray-500">
          <span className="text-black">{store.users.name}</span> ·{" "}
          {store.stores.phone}
        </div>
      </div>
      <StoreMapView store={store.stores} />

      <Separator />

      <h1 className="text-xl font-bold">精選商品</h1>

      <GridContainer>
        {dishes.map((dish) => (
          <>
            <StoreDish
              key={dish.id}
              storeDish={dish}
              isAuthor={session?.user.id === store.users.id}
              originalQuantity={dish.cart[0]?.quantity || 0}
            />
          </>
        ))}
      </GridContainer>
    </>
  );
}
