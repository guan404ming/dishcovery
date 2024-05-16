"use client";

import React from "react";
import { useState } from "react";

import { PlusCircle, MinusCircle } from "lucide-react";

import usePost from "@/hooks/use-post";

type ReservationUpdate = {
  id: number;
  postId: number;
  name: string;
  quantity: number;
  description: string;
  image: string;
};

export function ReservationUpdate({
  id,
  postId,
  name,
  quantity,
  description,
  image,
}: ReservationUpdate) {
  const { updatePost } = usePost();
  const [dishQuantity, setDishQuantity] = useState(quantity);

  const handleDecreaseQuantity = () => {
    if (dishQuantity !== undefined && dishQuantity > 0) {
      updatePost(id, postId, name, dishQuantity - 1, description, image);
      setDishQuantity(dishQuantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (dishQuantity !== undefined) {
      updatePost(id, postId, name, dishQuantity + 1, description, image);
      setDishQuantity(dishQuantity + 1);
    }
  };

  return (
    <div className="flex flex-row items-center gap-x-2">
      <MinusCircle onClick={handleDecreaseQuantity} />
      <p className="text-xs lg:text-lg">{dishQuantity}</p>
      <PlusCircle onClick={handleIncreaseQuantity} />
    </div>
  );
}
