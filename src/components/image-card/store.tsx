import type { SelectStore } from "@/lib/type";

import ImageCardPrimitive from "./image-card-primitive";

export function Store({ store }: { store: SelectStore }) {
  return (
    <ImageCardPrimitive
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
    </ImageCardPrimitive>
  );
}
