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
} from "@/lib/type";

import AddDialog from "./add-dialog";
import { ReservationCard } from "./reservation-card";

export default function InfoTab({
  postList,
  reservationList,
}: {
  postList: SelectPost[];
  reservationList: {
    postReservations: SelectPostReservation;
    postDishes: SelectPostDish;
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

      <TabsContent value="reservation">
        <GridContainer>
          {reservationList.map((reservation, index) => (
            <div
              key={index}
              onClick={() => setReserveDialogOpen(!reserveDialogOpen)}
            >
              <ReservationCard reservation={reservation} isCounter />
              <ReservationDialog
                postDishId={reservation.postReservations.postDishId}
                title="Reservation"
                open={reserveDialogOpen}
                onOpenChange={setReserveDialogOpen}
              />
            </div>
          ))}
        </GridContainer>
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
