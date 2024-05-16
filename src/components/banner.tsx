"use client";

import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type BannerProps = {
  bannerList: {
    url: string;
  }[];
};

export function Banner({ bannerList }: BannerProps) {
  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        {bannerList.map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 2xl:basis-1/3">
            <Image
              width={"600"}
              height={"600"}
              src={bannerList[index].url}
              alt="banner"
              className="aspect-[3/1] w-full rounded object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
