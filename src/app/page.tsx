import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { Banner } from "@/components/banner";
import { db } from "@/db";
import { bannerTable } from "@/db/schema";

export default async function Home() {
  const bannerList = await db.select().from(bannerTable);

  function SectionTitle({ title, url }: { title: string; url: string }) {
    return (
      <div className="flex items-baseline justify-between">
        <span className="text-xl font-semibold">{title}</span>
        <Link href={url} className="flex items-center space-x-1 font-thin">
          <span className="text-xs">See All</span>
          <ChevronRight size={16} strokeWidth={1} className="mb-[0.5px]" />
        </Link>
      </div>
    );
  }

  return (
    <>
      <Banner bannerList={bannerList} />
      <SectionTitle title={"Popular"} url="store" />
      <SectionTitle title={"Post"} url="post" />
    </>
  );
}
