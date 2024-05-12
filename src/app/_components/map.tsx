"use client";

import { useState } from "react";
import {
  APIProvider,
  Map, 
  AdvancedMarker,
  Pin, 
  InfoWindow,
} from "@vis.gl/react-google-maps";

export default function MapView() {
  const position = { lat: 25.0129, lng: 121.5371};
  const [open, setOpen] = useState(false);
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="h-[300px] w-[500px]">
        <Map zoom={15} center={position} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
          <AdvancedMarker position={position} onClick={() => setOpen(true)} >
            <Pin background={"black"} borderColor={"black"} glyphColor={"white"}/>
          </AdvancedMarker>
          {open && (<InfoWindow position={position} onCloseClick={() => setOpen(false)} pixelOffset={[0, -40]}>
            <div>
              <h1>電神邱冠銘在這裡發便當</h1>
            </div>
          </InfoWindow>)}
        </Map>
      </div>
    </APIProvider>
  );
}
