"use client";

import Image from "next/image";

export default function Map() {
  return (
    <Image src="/map.png" alt="Map" width={500} height={500} className="rounded-md bg-cover"/>
  );
}