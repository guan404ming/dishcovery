import { getServerSession } from "next-auth";
import Image from "next/image";

import { eq } from "drizzle-orm";
import { Bookmark } from "lucide-react";

import GridContainer from "@/components/grid-container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { storeDishes, stores, users } from "@/db/schema";
import { authOptions } from "@/lib/auth-options";
import StoreDish from "@/components/image-card/store-dish";

export default async function StorePage({
  params,
}: {
  params: { storeId: string };
}) {
  const [store] = await db
    .select()
    .from(stores)
    .where(eq(stores.id, parseInt(params.storeId)))
    .innerJoin(users, eq(stores.userId, users.id))
    .limit(1);

  const dishes = await db.query.storeDishes.findMany({
    where: eq(storeDishes.storeId, parseInt(params.storeId)),
  });

  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="relative w-full">
        <Button
          size={"icon"}
          variant="outline"
          className="absolute right-2 top-2 rounded-full border-none bg-black/30 backdrop-blur-sm "
        >
          <Bookmark className="stroke-white" />
        </Button>
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

      <Separator />

      <h1 className="text-xl font-bold">精選商品</h1>

      <GridContainer>
        {dishes.map((dish) => (
          <StoreDish
            key={dish.id}
            storeDish={dish}
            isAuthor={session?.user.id === store.users.id}
          />
        ))}
      </GridContainer>
    </>
  );
}
