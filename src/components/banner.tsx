/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { SelectBanner } from "@/lib/type";

import { AspectRatio } from "./ui/aspect-ratio";

/* eslint-disable @next/next/no-img-element */

type BannerProps = {
  bannerList: SelectBanner[];
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
                  src={bannerList[index].bannerUrl}
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
