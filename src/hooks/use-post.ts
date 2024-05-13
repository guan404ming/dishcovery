import { useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

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
    setLoading(true);

    await handleFetch({
      data: { postDishId, quantity, userId: session?.user?.id },
      method: "POST",
      url: "/api/posts/post-reservations",
    });

    toast("Post reservation has been created.");
    setLoading(false);
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
  }: InsertPost & InsertPostDish & { dishDescription: string }) => {
    setLoading(true);

    const body = await handleFetch({
      data: {
        title,
        description,
        location,
        name,
        quantity,
        userId: session?.user?.id,
      },
      method: "POST",
      url: "/api/posts",
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
    });

    toast("Post has been created.");
    router.refresh();
    setLoading(false);
  };

  return {
    createPost,
    createPostReservation,
    loading,
  };
}
