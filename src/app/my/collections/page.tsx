import { getServerSession } from "next-auth";

import { eq } from "drizzle-orm";

import GridContainer from "@/components/grid-container";
import { Store } from "@/components/image-card/store";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { storeCollections } from "@/db/schema";
import { authOptions } from "@/lib/auth-options";

export default async function MyCollectionsPage() {
  const session = await getServerSession(authOptions);

  const storeCollectionList = await db.query.storeCollections.findMany({
    where: eq(storeCollections.userId, session?.user.id as number),
    with: {
      store: true,
    },
  });

  console.log(storeCollectionList);

  return (
    <>
      <h2 className="text-xl font-semibold">Collections</h2>
      <Separator />

      <GridContainer>
        {storeCollectionList.map((storeCollection, index) => (
          <Store store={storeCollection.store} key={index} />
        ))}
      </GridContainer>
    </>
  );
}
