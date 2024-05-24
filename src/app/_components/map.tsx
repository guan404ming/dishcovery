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
import type { SelectPost } from "@/lib/type";

export default function MapView({ storeList, postList }: { storeList: SelectStore[], postList: SelectPost[]}) {
  const defaultCenter = { lat: 25.0129, lng: 121.5371 };
  const [selectStore, setSelectStore] = useState<number[]>([]
    //storeList.map((store) => store.id),
  );

  const [selectPost, setSelectPost] = useState<number[]>([]);

  const handleSetSelectStore = (id: number) => {
    if (selectStore.includes(id)) {
      setSelectStore((prev) => prev.filter((store) => store !== id));
    } else {
      setSelectStore((prev) => [...prev, id]);
    }
  };

  const handleSetSelectPost = (id: number) => {
    if (selectPost.includes(id)) {
      setSelectPost((prev) => prev.filter((post) => post !== id));
    } else {
      setSelectPost((prev) => [...prev, id]);
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
                background={"#006769"}
                borderColor={"#006769"}
                glyphColor={"white"}
              />
            </AdvancedMarker>
            {selectStore.includes(store.id) && (
              <InfoWindow
                position={{ lat: store.lat, lng: store.lng }}
                pixelOffset={[0, -40]}
                onClose={() => handleSetSelectStore(store.id)}
                className=""
              >
                <Link href={`/store/${store.id}`}>
                  <div className="text-[#006769] pb-1">餐廳</div>
                  <h1 className="text-sm hover:bg-[#00676923]  transition-colors">{store.name}</h1>
                </Link>
              </InfoWindow>
            )}
          </div>
        ))}
        {postList.map((post) => (
          <div key={post.id}>
            <AdvancedMarker
              position={{ lat: post.lat, lng: post.lng }}
              onClick={() => handleSetSelectPost(post.id)}
            >
              <Pin
                background={"#40A578"}
                borderColor={"#40A578"}
                glyphColor={"white"}
              />
            </AdvancedMarker>

            {selectPost.includes(post.id) && (
              <InfoWindow
                position={{ lat: post.lat, lng: post.lng }}
                pixelOffset={[0, -40]}
                onClose={() => handleSetSelectPost(post.id)}
                className=""
              >
                <Link href={`/post/${post.id}`}>
                  <div className="text-[#40A578] pb-1">貼文</div>
                  <h1 className="text-sm hover:bg-[#40A57823]  transition-colors">{post.title}</h1>
                </Link>
              </InfoWindow>
            )}
          </div>
        ))}
      </Map>
    </div>
  );
}
