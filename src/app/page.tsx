import { Banner } from "@/components/banner";
import { db } from "@/db";
import { bannerTable } from "@/db/schema";

export default async function Home() {
  const bannerList = await db.select().from(bannerTable);

  return (
    <>
      <Banner bannerList={bannerList} />
    </>
  );
}
