import type { SelectStore } from "@/lib/type";

import ImageCard from "./image-card";

export function Store({ store }: { store: SelectStore }) {
  return (
    <ImageCard href={`/store/${store.id}`} image={store.image}>
      <div className="flex justify-between">
        <h1 className="font-semibold">{store.name}</h1>
      </div>

      <p className="text-xs font-light text-muted-foreground">
        @{store.address}
      </p>

      <div className="mt-1 w-full max-w-24 overflow-hidden text-ellipsis text-wrap text-xs text-muted-foreground">
        {store.phone}
      </div>
    </ImageCard>
  );
}
