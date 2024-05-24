"use client";

import { useRouter } from "next/navigation";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { SelectStore } from "@/lib/type";

export default function StoreItem({ store }: { store: SelectStore }) {
  const router = useRouter();

  return (
    <div className="w-full space-y-2 border p-4">
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={store.image}></AvatarImage>
        </Avatar>
        <div>
          <p className="line-clamp-1">{store.name}</p>
          <span className="line-clamp-1 block text-sm font-light text-muted-foreground">
            {store.phone} · @{store.address}
          </span>
        </div>
      </div>

      <Button
        className="block w-full"
        onClick={() => router.push(`/my/cart/${store.id}`)}
      >
        View Cart
      </Button>
      <Button
        variant={"outline"}
        className="block w-full"
        onClick={() => router.push(`/store/${store.id}`)}
      >
        View Store
      </Button>
    </div>
  );
}
