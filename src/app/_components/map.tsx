"use client";

import { useState } from "react";

import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

import type { SelectStore } from "@/lib/type";

export default function MapView({ storeList }: { storeList: SelectStore[] }) {
  const position = { lat: 25.0129, lng: 121.5371 };
  const [open, setOpen] = useState(false);
  return (
    <div className="h-[350px] w-full">
      <Map
        defaultZoom={15}
        defaultCenter={position}
        mapId={process.env.NEXT_PUBLIC_MAP_ID}
      >
        {storeList.map((store) => (
          <div key={store.id}>
            <AdvancedMarker position={position} onClick={() => setOpen(true)}>
              <Pin
                background={"black"}
                borderColor={"black"}
                glyphColor={"white"}
              />
            </AdvancedMarker>
            {open && (
              <InfoWindow
                position={position}
                onCloseClick={() => setOpen(false)}
                pixelOffset={[0, -40]}
              >
                <div>
                  <h1>{store.name}</h1>
                </div>
              </InfoWindow>
            )}
          </div>
        ))}
      </Map>
    </div>
  );
}
