import type { SelectStore } from "@/lib/type";

import ImageCard from "./image-card";

export function Store({ store }: { store: SelectStore }) {
  return (
    <ImageCard
      href={`/store/${store.id}`}
      image={store.image}
      className="border-none shadow-none"
    >
      <h1 className="line-clamp-2 font-semibold">{store.name}</h1>

      <div className="text-sm font-light text-muted-foreground">
        @{store.address}
      </div>

      <div className="mt-1 line-clamp-3 w-full text-xs text-muted-foreground">
        {store.phone}
      </div>
    </ImageCard>
  );
}
