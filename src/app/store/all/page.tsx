import GridContainer from "@/components/grid-container";
import { Store } from "@/components/supplier/store";
import { db } from "@/db";

export default async function AllStore() {
  const storeList = await db.query.stores.findMany();

  return (
    <>
      <span className="text-xl font-semibold">All Posts</span>
      <GridContainer>
        {storeList.map((store) => (
          <Store store={store} key={store.id} />
        ))}
      </GridContainer>
    </>
  );
}
