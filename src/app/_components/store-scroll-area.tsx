"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Card } from "../../components/ui/card";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { SelectStore } from "@/lib/type";

export function StoreScrollArea({ storeList }: { storeList: SelectStore[] }) {
  const router = useRouter();

  return (
    <ScrollArea className="w-full overflow-hidden rounded-md">
      <div className="flex w-max space-x-2 md:space-x-4">
        {storeList.map((store) => (
          <Card
            key={store.name}
            className="flex w-[125px] cursor-pointer flex-col overflow-hidden text-center md:w-[200px]"
            onClick={() => {
              router.push("store/123");
            }}
          >
            <div className="rounded-md">
              <Image
                src={"/1.jpeg"}
                alt={`${store.name}`}
                className="aspect-[2/1] w-full object-cover"
                width={100}
                height={100}
              />
            </div>

            <div className="space-y-1 truncate px-4 py-2 text-xs font-semibold text-foreground">
              <p>{store.name}</p>
              <span className="block truncate font-normal text-muted-foreground">
                @{store.address}
              </span>
            </div>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  );
}
