"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Card } from "../../components/ui/card";

export interface Store {
  name: string;
  picUrl: string;
}

export const works: Store[] = [
  {
    name: "Ornella Binni",
    picUrl:
      "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Tom Byrom",
    picUrl:
      "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Vladimir",
    picUrl:
      "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Ornella Binni",
    picUrl:
      "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Tom Byrom",
    picUrl:
      "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Vladimir Malyavko Malyavko",
    picUrl:
      "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Vladimir Malyavko Malyavko",
    picUrl:
      "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];

export function StoreScrollArea() {
  const router = useRouter();

  return (
    <ScrollArea className="w-full overflow-hidden rounded-md">
      <div className="flex w-max space-x-2 md:space-x-4">
        {works.map((store) => (
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
            <div className="truncate px-4 py-2 text-xs font-semibold text-foreground">
              {store.name}{" "}
              <span className="block truncate font-normal text-muted-foreground">
                ${store.name.length} · 100 left
              </span>
            </div>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  );
}
