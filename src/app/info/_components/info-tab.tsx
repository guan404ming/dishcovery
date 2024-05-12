"use client";

import { useState } from "react";

import ReservationDialog from "../../../components/reservation-dialog";
import { PlusCircle } from "lucide-react";

import GridContainer from "@/components/grid-container";
import { Post } from "@/components/supplier/post";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  SelectPost,
  SelectPostDish,
  SelectPostReservation,
  SelectStoreDish,
  SelectStoreReservation,
} from "@/lib/type";

import AddDialog from "./add-dialog";
import { ReservationCard } from "./reservation-card";

export default function InfoTab({
  postList,
  postReservationList,
  storeReservationList,
}: {
  postList: SelectPost[];
  postReservationList: {
    postReservations: SelectPostReservation;
    postDishes: SelectPostDish;
  }[];
  storeReservationList: {
    storeReservations: SelectStoreReservation;
    storeDishes: SelectStoreDish;
  }[];
}) {
  const [reserveDialogOpen, setReserveDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

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
        <h1 className="font-semibold">Post Reservations</h1>
        {postReservationList.length > 0 && (
          <GridContainer>
            {postReservationList.map((reservation, index) => (
              <div
                key={index}
                onClick={() => setReserveDialogOpen(!reserveDialogOpen)}
              >
                <ReservationCard
                  {...reservation.postDishes}
                  {...reservation.postReservations}
                  isCounter
                />
                <ReservationDialog
                  dishId={reservation.postReservations.postDishId}
                  title="Reservation"
                  open={reserveDialogOpen}
                  onOpenChange={setReserveDialogOpen}
                />
              </div>
            ))}
          </GridContainer>
        )}

        <h1 className="font-semibold">Store Reservations</h1>
        {storeReservationList.length > 0 && (
          <GridContainer>
            {storeReservationList.map((reservation, index) => (
              <div
                key={index}
                onClick={() => setReserveDialogOpen(!reserveDialogOpen)}
              >
                <ReservationCard
                  {...reservation.storeDishes}
                  {...reservation.storeReservations}
                  isCounter
                />
                <ReservationDialog
                  dishId={reservation.storeReservations.storeDishId}
                  title="Reservation"
                  open={reserveDialogOpen}
                  onOpenChange={setReserveDialogOpen}
                />
              </div>
            ))}
          </GridContainer>
        )}
      </TabsContent>

      <TabsContent value="post">
        <GridContainer>
          {postList.map((post, index) => (
            <Post post={post} key={index} isCounter />
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
        <AddDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          type="item"
        />
      </TabsContent>
    </Tabs>
  );
}
