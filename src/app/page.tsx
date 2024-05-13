import Link from "next/link";

import { ChevronRight } from "lucide-react";

import MapView from "@/app/_components/map";
import { StoreScrollArea } from "@/app/_components/store-scroll-area";
import { Banner } from "@/components/banner";
import GridContainer from "@/components/grid-container";
import { Post } from "@/components/supplier/post";
import { db } from "@/db";

export default async function Home() {
  const bannerList = await db.query.banners.findMany();
  const postList = await db.query.posts.findMany({ limit: 10, with: { postDishes: true } });
  const storeList = await db.query.stores.findMany({ limit: 10 });

  function SectionTitle({ title, url }: { title: string; url?: string }) {
    return (
      <div className="flex items-baseline justify-between">
        <span className="text-xl font-semibold">{title}</span>
        {url && (
          <Link href={url} className="flex items-center space-x-1 font-thin">
            <span className="text-xs">See All</span>
            <ChevronRight size={16} strokeWidth={1} className="mb-[0.5px]" />
          </Link>
        )}
      </div>
    );
  }

  return (
    <>
      <Banner bannerList={bannerList} />

      <SectionTitle title={"What are you looking for?"} url="" />
      <MapView />

      <SectionTitle title={"Popular Stores"} url="/store/all" />
      <StoreScrollArea storeList={storeList} />

      <SectionTitle title={"Post"} url="/post/all" />

      <GridContainer>
        {postList.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </GridContainer>
    </>
  );
}
