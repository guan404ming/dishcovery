import { eq } from "drizzle-orm";
import { ChevronLeft } from "lucide-react";
import { BellPlus } from "lucide-react";

import Dish from "@/components/dish";
import GridContainer from "@/components/grid-container";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { storeDishes, stores, users } from "@/db/schema";

export default async function Store({
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

  return (
    <>
      <div className="flex w-full items-center justify-between text-center">
        <ChevronLeft className="h-4 w-4 cursor-pointer" />
        <h1 className="text-center text-xl font-semibold">
          {store.stores.name}
        </h1>
        <BellPlus className="h-4 w-4 cursor-pointer" />
      </div>

      <Separator />

      <GridContainer>
        {dishes.map((dish) => (
          <Dish key={dish.id} dish={dish} />
        ))}
      </GridContainer>
    </>
  );
}
