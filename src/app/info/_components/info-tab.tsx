"use client";

import { useState } from "react";

import { PostCard } from "../../../components/post-card";
import ReservationDialog from "../../../components/reservation-dialog";
import { PlusCircle } from "lucide-react";

import GridContainer from "@/components/grid-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SelectPost } from "@/lib/type";

import AddDialog from "./add-dialog";
import { PurchaseCard } from "./purchase-card";

export default function InfoTab({ postList }: { postList: SelectPost[] }) {
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

      <TabsContent value="purchase">
        <GridContainer>
          {mockPurchase.map((purchase, index) => (
            <div
              key={index}
              onClick={() => setReserveDialogOpen(!reserveDialogOpen)}
            >
              <PurchaseCard purchase={purchase} />
            </div>
          ))}
        </GridContainer>

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
        {postList.map((post, index) => (
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
        {postList.map((post, index) => (
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
