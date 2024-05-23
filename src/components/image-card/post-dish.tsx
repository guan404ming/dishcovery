"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Plus, Pen } from "lucide-react";

import ReservationDialog from "@/components/dialog/reservation-dialog";
import ImageCardPrimitive from "@/components/image-card/image-card-primitive";
import { Button } from "@/components/ui/button";
import usePost from "@/hooks/use-post";
import type { SelectPostDish } from "@/lib/type";

export default function PostDish({
  postDish,
  isAuthor,
  isCounter,
}: {
  postDish: SelectPostDish;
  isAuthor?: boolean;
  isCounter?: boolean;
}) {
  const { updatePostDish } = usePost();
  const [reserve, setReserve] = useState(false);
  const router = useRouter();

  return (
    <ImageCardPrimitive
      image={postDish.image}
      counter={
        isCounter
          ? {
              amount: postDish.quantity,
              setAmount: async (number: number) => {
                await updatePostDish({ ...postDish, quantity: number });
              },
            }
          : undefined
      }
      className="relative"
    >
      {isAuthor ? (
        <Button
          size={"icon"}
          variant="outline"
          className="absolute bottom-2 left-20 h-8 w-8 rounded-full border"
          onClick={() => router.push(`/post/post-dish/${postDish.id}`)}
        >
          <Pen className="h-3 w-3" strokeWidth={3} />
        </Button>
      ) : (
        <>
          <Button
            size={"icon"}
            variant="outline"
            className="absolute bottom-2 left-20 h-8 w-8 rounded-full border"
            onClick={() => setReserve(!reserve)}
          >
            <Plus className="h-3 w-3" strokeWidth={3} />
          </Button>
          <ReservationDialog
            title="Reservation"
            open={reserve}
            onOpenChange={setReserve}
            dishId={postDish.id}
          />
        </>
      )}
      <h1 className="line-clamp-1 font-semibold md:line-clamp-2">
        {postDish.name}
      </h1>

      <div className="flex items-center space-x-2 text-sm">
        <span>
          {postDish.price !== 0 ? `$${postDish.price}` : "free"}
          {!isAuthor && <span> · Remaining: {postDish.quantity}</span>}
        </span>
      </div>

      <span className="my-1 line-clamp-1 text-sm text-muted-foreground md:line-clamp-2">
        {postDish.description}
      </span>
    </ImageCardPrimitive>
  );
}
