import { useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import handleFetch from "./utils";

export default function useCart() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const updateCart = async (id: number, quantity: number, isPost?: boolean) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      await handleFetch({
        data: { id, quantity },
        method: "PUT",
        url: isPost ? `/api/posts/post-carts` : `/api/carts`,
        successMessage: "Cart item quantity has been updated.",
        setLoading,
      });
    }
    router.refresh();
  };

  const addToCart = async (id: number, quantity: number, isPost?: boolean) => {
    await handleFetch({
      data: {
        storeDishId: id,
        postId: id,
        quantity,
        userId: session?.user?.id,
      },
      method: "POST",
      url: isPost ? `/api/posts/post-carts` : `/api/carts`,
      successMessage: "Cart item has been added.",
      setLoading,
    });
    router.refresh();
  };

  const removeFromCart = async (
    id: number,
    isClearCart?: boolean,
    isPost?: boolean,
  ) => {
    await handleFetch({
      data: { id },
      method: "DELETE",
      url: isPost ? `/api/posts/post-carts` : `/api/carts`,
      successMessage: !isClearCart ? "Cart item has been removed." : undefined,
      setLoading,
    });
    router.refresh();
  };

  return {
    addToCart,
    removeFromCart,
    updateCart,
    loading,
  };
}
