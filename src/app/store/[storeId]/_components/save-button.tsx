"use client";

import { useSession } from "next-auth/react";

import { Bookmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import useStore from "@/hooks/use-store";
import type { SelectStoreCollection } from "@/lib/type";
import { cn } from "@/lib/utils";

export default function SaveButton({
  storeId,
  storeCollection,
}: {
  storeId: number;
  storeCollection?: SelectStoreCollection;
}) {
  const { saveStore, unsaveStore } = useStore();
  const session = useSession();

  return (
    <Button
      size={"icon"}
      variant="outline"
      className={cn(
        "absolute right-2 top-2 rounded-full border-none bg-black/30 backdrop-blur-sm ",
        !session.data?.user && "hidden",
      )}
    >
      <Bookmark
        className={cn("stroke-white", storeCollection && "fill-white")}
        onClick={() => {
          if (!storeCollection) saveStore({ storeId });
          else unsaveStore({ id: storeCollection.id });
        }}
      />
    </Button>
  );
}
