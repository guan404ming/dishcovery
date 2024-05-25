import React, { useState } from "react";

import {
  AdvancedMarker,
  Map,
  type MapMouseEvent,
} from "@vis.gl/react-google-maps";

const center = { lat: 25.0129, lng: 121.5371 };
interface LocationPickerProps {
  setLocation: (location: { lat: number; lng: number }) => void;
}

function LocationPicker({ setLocation }: LocationPickerProps) {
  const [markerPosition, setMarkerPosition] = useState(center);

  const handleMapClick = (event: MapMouseEvent) => {
    if (event.detail.latLng) {
      const newPosition = {
        lat: event.detail.latLng.lat,
        lng: event.detail.latLng.lng,
      };
      setMarkerPosition(newPosition);
      setLocation(newPosition);
    }
  };

  return (
    <div className="h-[350px] w-full">
      <Map
        defaultCenter={markerPosition}
        defaultZoom={15}
        onClick={(e) => handleMapClick(e)}
        mapId={process.env.NEXT_PUBLIC_MAP_ID}
      >
        <AdvancedMarker position={markerPosition} />
      </Map>
    </div>
  );
}

export default React.memo(LocationPicker);
