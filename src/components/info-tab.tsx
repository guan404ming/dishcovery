"use client";

import { useState } from "react";

import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AddDialog from "./add-dialog";
import { PostCard } from "./post-card";
import { PurchaseCard } from "./purchase-card";
import ReservationDialog from "./reservation-dialog";

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

  const handleReserveClick = () => {
    setReserveDialogOpen(true);
  };
  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  return (
    <Tabs defaultValue="purchase" className="w-full">
      <div className="flex w-full items-center justify-between">
        <TabsList>
          <TabsTrigger value="purchase" className="pl-0">
            Purchase
          </TabsTrigger>
          <TabsTrigger value="post" className="border-x">
            Post
          </TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
        </TabsList>

        <TabsContent value="purchase">
          <Button
            variant="ghost"
            size="icon"
            className="flex flex-col items-center justify-center"
          >
            <PlusCircle size={18} strokeWidth={1.5} />
          </Button>
        </TabsContent>
        <TabsContent value="post">
          <Button
            variant="ghost"
            size="icon"
            className="flex flex-col items-center justify-center"
            onClick={handleAddClick}
          >
            <PlusCircle size={18} strokeWidth={1.5} />
          </Button>
          {addDialogOpen && (
            <AddDialog
              open={addDialogOpen}
              onOpenChange={setAddDialogOpen}
              type="post"
            />
          )}
        </TabsContent>
        <TabsContent value="store">
          <Button
            variant="ghost"
            size="icon"
            className="flex flex-col items-center justify-center"
            onClick={handleAddClick}
          >
            <PlusCircle size={18} strokeWidth={1.5} />
          </Button>
          {addDialogOpen && (
            <AddDialog
              open={addDialogOpen}
              onOpenChange={setAddDialogOpen}
              type="item"
            />
          )}
        </TabsContent>
      </div>

      <TabsContent value="purchase">
        {mockPurchase.map((purchase, index) => (
          <div key={index} onClick={handleReserveClick}>
            <PurchaseCard {...purchase} />
          </div>
        ))}
        {reserveDialogOpen && (
          <ReservationDialog
            title="Reservation"
            open={reserveDialogOpen}
            onOpenChange={setReserveDialogOpen}
          />
        )}
      </TabsContent>
      <TabsContent value="post" className="space-y-2">
        {mockPost.map((post, index) => (
          <PostCard post={post} key={index} isCounter={true} />
        ))}
      </TabsContent>
      <TabsContent value="store" className="space-y-2">
        {mockPost.map((post, index) => (
          <PostCard post={post} key={index} isCounter={true} />
        ))}
      </TabsContent>
    </Tabs>
  );
}
