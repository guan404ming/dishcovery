"use client";

import { useState } from "react";

import { PlusCircle } from "lucide-react";

import GridContainer from "@/components/grid-container";
import { Post } from "@/components/supplier/post";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import usePost from "@/hooks/use-post";
import useStore from "@/hooks/use-store";
import type {
  SelectPost,
  SelectPostDish,
  SelectPostReservation,
  SelectStoreDish,
  SelectStoreReservation,
} from "@/lib/type";

import AddDialog from "./add-dialog";
import { ReservationCard } from "./reservation-card";
import { StoreCard } from "./store-counter-card";

export default function InfoTab({
  postList,
  postReservationList,
  storeReservationList,
  storeDishList,
}: {
  postList: (SelectPost & { postDishes: SelectPostDish })[];
  postReservationList: {
    postReservations: SelectPostReservation;
    postDishes: SelectPostDish;
  }[];
  storeReservationList: {
    storeReservations: SelectStoreReservation;
    storeDishes: SelectStoreDish;
  }[];
  storeDishList: SelectStoreDish[];
}) {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const { updateStoreDish } = useStore();
  const { updatePost } = usePost();

  return (
    <Tabs defaultValue="reservation" className="w-full">
      <div className="mb-2 flex w-full items-center justify-between">
        <TabsList>
          <TabsTrigger value="reservation" className="pl-0">
            Reservation
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

      <TabsContent value="reservation" className="space-y-4">
        {postReservationList.length > 0 && (
          <>
            <h1 className="text-xl font-semibold">Post Reservations</h1>
            <GridContainer>
              {postReservationList.map((reservation, index) => (
                <ReservationCard
                  key={index}
                  {...reservation.postDishes}
                  {...reservation.postReservations}
                  isPost={true}
                />
              ))}
            </GridContainer>
          </>
        )}

        {storeReservationList.length > 0 && (
          <>
            <h1 className="text-xl font-semibold">Store Reservations</h1>
            <GridContainer>
              {storeReservationList.map((reservation, index) => (
                <ReservationCard
                  {...reservation.storeDishes}
                  {...reservation.storeReservations}
                  isPost={false}
                  key={index}
                />
              ))}
            </GridContainer>
          </>
        )}
      </TabsContent>

      <TabsContent value="post">
        <GridContainer>
          {postList.map((post, index) => (
            <Post
              post={post}
              key={index}
              counter={{
                amount: post.postDishes.quantity,
                setAmount: async (number: number) => {
                  await updatePost(
                    post.id,
                    post.postDishes.id,
                    post.postDishes.name,
                    number,
                    post.postDishes.description,
                    post.postDishes.image,
                  );
                },
              }}
            />
          ))}
        </GridContainer>

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
        <GridContainer>
          {storeDishList.map((storeDish, index) => (
            <StoreCard
              storeDish={storeDish}
              key={index}
              counter={{
                amount: storeDish.quantity,
                setAmount: async (number: number) => {
                  await updateStoreDish({ ...storeDish, quantity: number });
                },
              }}
            />
          ))}
        </GridContainer>
        <AddDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          type="item"
        />
      </TabsContent>
    </Tabs>
  );
}
