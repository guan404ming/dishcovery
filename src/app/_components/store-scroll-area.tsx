"use client";

import Image from "next/image";
import Link from "next/link";

import { Card } from "../../components/ui/card";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { SelectStore } from "@/lib/type";

export function StoreScrollArea({ storeList }: { storeList: SelectStore[] }) {
  return (
    <ScrollArea className="w-full overflow-hidden rounded-md">
      <div className="flex w-max space-x-2">
        {storeList.map((store) => (
          <Link key={store.name} href={`/store/${store.id}`}>
            <Card className="flex w-[200px] cursor-pointer flex-col border-none">
              <Image
                src={store.image}
                alt={`${store.name}`}
                className="aspect-[2/1] w-full rounded-md object-cover"
                width={100}
                height={100}
              />

              <div className="py-2">
                <p className="line-clamp-1 text-base font-medium">
                  {store.name}
                </p>
                <span className="block text-sm font-light text-muted-foreground">
                  {store.phone} · @{store.address}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  );
}
