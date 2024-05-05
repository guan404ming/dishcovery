import Image from "next/image";

import { Card } from "./ui/card";

export interface Post {
  title: string;
  content: string;
  picUrl: string;
}

export function Post({ post }: { post: Post }) {
  return (
    <Card
      key={post.title}
      className="flex h-fit max-h-24 w-full flex-row text-ellipsis text-center md:max-h-24 lg:max-h-56"
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
  );
}
