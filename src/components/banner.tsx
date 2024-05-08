"use client";

import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { AspectRatio } from "./ui/aspect-ratio";

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
            <Card>
              <AspectRatio ratio={3 / 1}>
                <Image
                  width={"600"}
                  height={"600"}
                  src={bannerList[index].url}
                  alt="banner"
                  className="w-full rounded object-cover"
                />
              </AspectRatio>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
