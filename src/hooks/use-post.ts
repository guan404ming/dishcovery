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
    dishQuantity,
  }: {
    dishQuantity: number;
    postDishId: number;
    quantity: number;
  }) => {
    await handleFetch({
      data: { postDishId, quantity, userId: session?.user?.id },
      method: "POST",
      url: "/api/posts/post-reservations",
      successMessage: "Post reservation has been created.",
      setLoading,
    });

    await handleFetch({
      data: { id: postDishId, quantity: dishQuantity - quantity },
      method: "PUT",
      url: "/api/posts/post-dishes",
      setLoading,
    });

    router.refresh();
  };

  const updatePostReservation = async ({
    id,
    quantity,
    status,
    postDishId,
    dishQuantity,
  }: InsertPostReservation & { dishQuantity: number }) => {
    if (quantity === 0 && id) {
      await deletePostReservation(id);
    } else {
      await handleFetch({
        data: { id, quantity, status },
        method: "PUT",
        url: "/api/posts/post-reservations",
        successMessage: "Post reservation has been updated.",
        setLoading,
      });
    }

    await handleFetch({
      data: { id: postDishId, quantity: dishQuantity },
      method: "PUT",
      url: "/api/posts/post-dishes",
      setLoading,
    });

    router.refresh();
  };

  const finishPostReservation = async (id: number, quantity: number) => {
    await handleFetch({
      data: { id, quantity, status: "finished" },
      method: "PUT",
      url: "/api/posts/post-reservations",
      successMessage: "Reservation has been finished.",
      setLoading,
    });
    router.refresh();
  };

  const deletePostReservation = async (id: number) => {
    await handleFetch({
      data: { id },
      method: "DELETE",
      url: "/api/posts/post-reservations",
      successMessage: "Reservation has been deleted.",
      setLoading,
    });
    router.refresh();
  };

  const updatePostDish = async ({
    id,
    quantity,
    postId,
    name,
    price,
    description,
    image,
  }: InsertPostDish) => {
    await handleFetch({
      data: { id, quantity, postId, name, price, description, image },
      method: "PUT",
      url: "/api/posts/post-dishes",
      successMessage: "Post dish has been updated.",
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
    InsertPostDish & { dishDescription?: string } & {
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

  const deletePost = async ({ id }: { id: number }) => {
    await handleFetch({
      data: { id },
      method: "DELETE",
      url: "/api/posts",
      successMessage: "Post has been deleted.",
      setLoading,
    });
    router.refresh();
  };

  return {
    createPost,
    deletePost,
    createPostReservation,
    updatePostReservation,
    finishPostReservation,
    deletePostReservation,
    updatePostDish,
    updatePost,
    loading,
  };
}
