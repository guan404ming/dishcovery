import { Separator } from "@/components/ui/separator";

export default async function Info() {
  // const session = await getServerSession();
  // const storeList = await db.select().from(storeCollectionTable).where(eq(storeCollectionTable.userId, session?.user.id as number)).limit(10);

  return (
    <>
      <h2 className="text-xl font-semibold">Collections</h2>
      <Separator />
    </>
  );
}
