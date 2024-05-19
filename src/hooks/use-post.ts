import { useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import type {
  InsertPost,
  InsertPostDish,
  InsertPostReservation,
} from "@/lib/type";

import handleFetch from "./utils";

export default function usePost() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const createPostReservation = async ({
    postDishId,
    quantity,
  }: InsertPostReservation) => {
    await handleFetch({
      data: { postDishId, quantity, userId: session?.user?.id },
      method: "POST",
      url: "/api/posts/post-reservations",
      successMessage: "Post reservation has been created.",
      setLoading,
    });
    router.refresh();
  };

  const updatePostReservation = async ({
    id,
    quantity,
    status,
  }: InsertPostReservation) => {
    await handleFetch({
      data: { id, quantity, status },
      method: "PUT",
      url: "/api/posts/post-reservations",
      successMessage: "Post reservation has been updated.",
      setLoading,
    });
    router.refresh();
  };

  const createPost = async ({
    title,
    description,
    location,
    name,
    dishDescription,
    quantity,
    image,
    lat,
    lng,
  }: InsertPost &
    InsertPostDish & { dishDescription: string } & {
      lat: number;
      lng: number;
    }) => {
    setLoading(true);

    const body = await handleFetch({
      data: {
        title,
        description,
        location,
        name,
        quantity,
        userId: session?.user?.id,
        lat,
        lng,
      },
      method: "POST",
      url: "/api/posts",
      successMessage: "Post has been created.",
      setLoading,
    });

    await handleFetch({
      data: {
        postId: body.data.id,
        name,
        quantity,
        description: dishDescription,
        image,
      },
      method: "POST",
      url: "/api/posts/post-dishes",
      successMessage: "Post dish has been created.",
      setLoading,
    });
    router.refresh();
  };

  const updatePost = async (
    id: number,
    postId: number,
    name: string,
    quantity: number,
    description: string,
    image: string,
  ) => {
    await handleFetch({
      data: {
        id,
        postId,
        name,
        quantity,
        description,
        image,
      },
      method: "PUT",
      url: `/api/posts/post-dishes`,
      successMessage: "Post dish has been updated.",
      setLoading,
    });
    router.refresh();
  };

  return {
    createPost,
    createPostReservation,
    updatePostReservation,
    updatePost,
    loading,
  };
}
