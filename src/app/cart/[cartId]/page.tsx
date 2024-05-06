"use client";

import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mockPost = [
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

export default function Sell() {
  // const totalCost = mockPost.reduce((acc, product) => {
  //   const cost = parseFloat(product.cost);
  //   return acc + cost * product.amount;
  // }, 0);

  return (
    <>
      <p className="text-xl font-bold">Cart</p>

      <div className="flex flex-col gap-4">
        {mockPost.map((post, index) => (
          <PostCard post={post} key={index} isCounter={true} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold text-slate-600">
          Total{"  "}${1000}
        </p>
        <Button>Confirm</Button>
      </div>

      <Separator />
    </>
  );
}
