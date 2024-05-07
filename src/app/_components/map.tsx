"use client";

import Image from "next/image";

export default function Map() {
  return (
    <div className="flex justify-center">
      <Image
        src="/map.png"
        alt="Map"
        width={500}
        height={500}
        className="aspect-square w-full rounded-md object-cover md:aspect-[6/1]"
      />
    </div>
  );
}
