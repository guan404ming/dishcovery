"use client";

import Image from "next/image";


import { Card } from "./ui/card";

export interface Post {
    title: string;
    content: string;
    picUrl: string;
}

export const works: Post[] = [
    {
        title: "Ornella Binni",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis tortor nec magna malesuada condimentum sodales nec tellus. Vestibulum elementum efficitur tincidunt. Pellentesque scelerisque diam eu magna suscipit mollis. ",
        picUrl:
            "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
    },
    {
        title: "Tom Byrom",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis tortor nec magna malesuada condimentum sodales nec tellus. Vestibulum elementum efficitur tincidunt. Pellentesque scelerisque diam eu magna suscipit mollis. ",
        picUrl:
            "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
    },
    {
        title: "Vladimir",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis tortor nec magna malesuada condimentum sodales nec tellus. Vestibulum elementum efficitur tincidunt. Pellentesque scelerisque diam eu magna suscipit mollis. ",
        picUrl:
            "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
    },
    {
        title: "Ornella Binni",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis tortor nec magna malesuada condimentum sodales nec tellus. Vestibulum elementum efficitur tincidunt. Pellentesque scelerisque diam eu magna suscipit mollis. ",
        picUrl:
            "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
    },
    {
        title: "Tom Byrom",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis tortor nec magna malesuada condimentum sodales nec tellus. Vestibulum elementum efficitur tincidunt. Pellentesque scelerisque diam eu magna suscipit mollis. ",
        picUrl:
            "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
    },
    {
        title: "Vladimir Malyavko Malyavko",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis tortor nec magna malesuada condimentum sodales nec tellus. Vestibulum elementum efficitur tincidunt. Pellentesque scelerisque diam eu magna suscipit mollis. ",
        picUrl:
            "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
    },
    {
        title: "Vladimir Malyavko Malyavko",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis tortor nec magna malesuada condimentum sodales nec tellus. Vestibulum elementum efficitur tincidunt. Pellentesque scelerisque diam eu magna suscipit mollis. ",
        picUrl:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
];

export function PostListing() {
  return (
      <div className="flex flex-col w-full">
        {works.map((post) => (
          <Card
            key={post.title}
            className="flex w-full h-fit flex-row text-center my-3 mt-1 text-ellipsis"
          >
            <div className="rounded-md">
              <Image
                src={"/1.jpeg"}
                alt={`${post.title}`}
                className="aspect-[2/1] w-[400px] h-full object-cover"
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col items-start truncate px-4 py-3 text-xs font-semibold text-foreground text-left">
                <div className="flex flex-row mb-1">
                    <div>{post.title}{" "}</div>
                    <div className="ml-2 text-xs font-light text-muted-foreground">Remaining: 100 </div>
                </div>
              <span className="block truncate font-normal text-muted-foreground text-wrap text-left">
                {post.content}
              </span>
            </div>
          </Card>
        ))}
      </div>
  );
}
