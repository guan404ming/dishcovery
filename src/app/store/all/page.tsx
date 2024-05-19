import GridContainer from "@/components/grid-container";
import { Store } from "@/components/image-card/store";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";

export default async function AllStorePage() {
  const storeList = await db.query.stores.findMany();

  return (
    <>
      <span className="text-xl font-semibold">All Stores</span>
      <GridContainer>
        {storeList.map((store) => (
          <>
            <Store store={store} key={store.id} />
            <Separator className="md:hidden"></Separator>
          </>
        ))}
      </GridContainer>
    </>
  );
}
