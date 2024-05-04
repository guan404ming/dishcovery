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
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis tortor nec magna malesuada condimentum sodales nec tellus. Vestibulum elementum efficitur tincidunt. Pellentesque scelerisque diam eu magna suscipit mollis. ",
    picUrl:
      "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "Tom Byrom",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis tortor nec magna malesuada condimentum sodales nec tellus. Vestibulum elementum efficitur tincidunt. Pellentesque scelerisque diam eu magna suscipit mollis. ",
    picUrl:
      "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "Vladimir",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis tortor nec magna malesuada condimentum sodales nec tellus. Vestibulum elementum efficitur tincidunt. Pellentesque scelerisque diam eu magna suscipit mollis. ",
    picUrl:
      "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "Ornella Binni",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis tortor nec magna malesuada condimentum sodales nec tellus. Vestibulum elementum efficitur tincidunt. Pellentesque scelerisque diam eu magna suscipit mollis. ",
    picUrl:
      "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "Tom Byrom",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis tortor nec magna malesuada condimentum sodales nec tellus. Vestibulum elementum efficitur tincidunt. Pellentesque scelerisque diam eu magna suscipit mollis. ",
    picUrl:
      "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "Vladimir Malyavko Malyavko",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis tortor nec magna malesuada condimentum sodales nec tellus. Vestibulum elementum efficitur tincidunt. Pellentesque scelerisque diam eu magna suscipit mollis. ",
    picUrl:
      "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "Vladimir Malyavko Malyavko",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis tortor nec magna malesuada condimentum sodales nec tellus. Vestibulum elementum efficitur tincidunt. Pellentesque scelerisque diam eu magna suscipit mollis. ",
    picUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function PostListing() {
  return (
    <div className="flex w-full flex-col max-md:space-y-2 md:grid md:grid-cols-2 md:gap-4">
      {works.map((post) => (
        <Card
          key={post.title}
          className="flex h-fit max-h-24 w-full flex-row text-ellipsis text-center md:max-h-56"
        >
          <Image
            src={"/1.jpeg"}
            alt={`${post.title}`}
            className="aspect-[1/1] object-cover"
            width={100}
            height={100}
          />
          <div className="flex flex-col items-start truncate px-4 py-3 text-left text-xs font-semibold text-foreground">
            <div className="mb-1 flex flex-col space-y-0.5">
              <div>{post.title}</div>
              <div className="text-xs font-light text-muted-foreground">
                Remaining: 100{" "}
              </div>
            </div>
            <span className="block truncate text-wrap text-left font-normal text-muted-foreground">
              {post.content}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
