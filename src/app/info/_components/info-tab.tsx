"use client";

import { useState } from "react";

import { PostCard } from "../../../components/post-card";
import ReservationDialog from "../../../components/reservation-dialog";
import { PlusCircle } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AddDialog from "./add-dialog";
import { PurchaseCard } from "./purchase-card";

export default function InfoTab() {
  const mockPurchase = [
    {
      id: 123,
      storeName: "Store A",
      price: 10.99,
      state: "餐點準備中",
      photo: "1.jpeg",
    },
    {
      id: 456,
      storeName: "Store B",
      price: 15.49,
      state: "餐點準備中",
      photo: "1.jpeg",
    },
    {
      id: 789,
      storeName: "Store C",
      price: 8.75,
      state: "餐點準備中",
      photo: "1.jpeg",
    },
  ];

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

  const [reserveDialogOpen, setReserveDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <Tabs defaultValue="purchase" className="w-full">
      <div className="mb-2 flex w-full items-center justify-between">
        <TabsList>
          <TabsTrigger value="purchase" className="pl-0">
            Purchase
          </TabsTrigger>
          <TabsTrigger value="post" className="border-x">
            Post
          </TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
        </TabsList>
        <PlusCircle
          size={18}
          strokeWidth={1.5}
          onClick={() => setAddDialogOpen(!addDialogOpen)}
          className="cursor-pointer"
        />
      </div>

      <TabsContent
        className="grid grid-cols-1 gap-2 md:grid-cols-2"
        value="purchase"
      >
        {mockPurchase.map((purchase, index) => (
          <div
            key={index}
            onClick={() => setReserveDialogOpen(!reserveDialogOpen)}
          >
            <PurchaseCard purchase={purchase} />
          </div>
        ))}
        <ReservationDialog
          title="Reservation"
          open={reserveDialogOpen}
          onOpenChange={setReserveDialogOpen}
        />
      </TabsContent>

      <TabsContent
        className="grid grid-cols-1 gap-2 md:grid-cols-2"
        value="post"
      >
        {mockPost.map((post, index) => (
          <PostCard post={post} key={index} isCounter={true} />
        ))}
        <AddDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          type="post"
        />
      </TabsContent>

      <TabsContent
        className="grid grid-cols-1 gap-2 md:grid-cols-2"
        value="store"
      >
        {mockPost.map((post, index) => (
          <PostCard post={post} key={index} isCounter={true} />
        ))}
        <AddDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          type="item"
        />
      </TabsContent>
    </Tabs>
  );
}
