"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

import type { SelectStore } from "@/lib/type";

export default function MapView({ storeList }: { storeList: SelectStore[] }) {
  const defaultCenter = { lat: 25.0129, lng: 121.5371 };
  const [selectStore, setSelectStore] = useState<number[]>(
    storeList.map((store) => store.id),
  );

  const handleSetSelectStore = (id: number) => {
    if (selectStore.includes(id)) {
      setSelectStore((prev) => prev.filter((store) => store !== id));
    } else {
      setSelectStore((prev) => [...prev, id]);
    }
  };

  return (
    <div className="h-[350px] w-full">
      <Map
        defaultZoom={15}
        defaultCenter={defaultCenter}
        mapId={process.env.NEXT_PUBLIC_MAP_ID}
      >
        {storeList.map((store) => (
          <div key={store.id}>
            <AdvancedMarker
              position={{ lat: store.lat, lng: store.lng }}
              onClick={() => handleSetSelectStore(store.id)}
            >
              <Pin
                background={"black"}
                borderColor={"black"}
                glyphColor={"white"}
              />
            </AdvancedMarker>

            {selectStore.includes(store.id) && (
              <InfoWindow
                position={{ lat: store.lat, lng: store.lng }}
                pixelOffset={[0, -40]}
                onClose={() => handleSetSelectStore(store.id)}
                className="p-1"
              >
                <Link href={`/store/${store.id}`}>
                  <h1 className=" text-blue-600 underline">{store.name}</h1>
                </Link>
              </InfoWindow>
            )}
          </div>
        ))}
      </Map>
    </div>
  );
}
