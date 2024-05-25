import { getServerSession } from "next-auth";

import CartPostItem from "../_components/cart-post-item";
import CartStoreItem from "../_components/cart-store-item";
import { eq } from "drizzle-orm";
import { ShoppingCart } from "lucide-react";

import UnauthorizedPage from "@/app/unauthorized";
import GridContainer from "@/components/grid-container";
import { db } from "@/db";
import {
  carts,
  postCarts,
  postDishes,
  posts,
  storeDishes,
  stores,
} from "@/db/schema";
import { authOptions } from "@/lib/auth-options";

export default async function MyAllCartPage() {
  const session = await getServerSession(authOptions);
  if (!session) return <UnauthorizedPage />;

  if (!session?.user) {
    return <UnauthorizedPage />;
  }

  const storeList = await db
    .selectDistinct({
      stores,
    })
    .from(carts)
    .where(eq(carts.userId, session.user.id))
    .innerJoin(storeDishes, eq(storeDishes.id, carts.storeDishId))
    .innerJoin(stores, eq(stores.id, storeDishes.storeId));

  const postList = await db
    .selectDistinct({
      posts,
    })
    .from(postCarts)
    .where(eq(postCarts.userId, session.user.id))
    .innerJoin(postDishes, eq(postDishes.id, postCarts.postDishId))
    .innerJoin(posts, eq(posts.id, postDishes.postId));

  if (storeList.length + postList.length === 0) {
    return (
      <div className="flex flex-grow flex-col items-center justify-center space-y-4 text-center text-xl font-semibold">
        <ShoppingCart size={40} />
        <p>Cart is empty</p>
      </div>
    );
  }

  return (
    <>
      <p className="text-xl font-bold">Cart</p>

      <GridContainer>
        {storeList.map((store) => (
          <CartStoreItem key={store.stores.id} store={store.stores} />
        ))}
        {postList.map((post) => (
          <CartPostItem key={post.posts.id} post={post.posts} />
        ))}
      </GridContainer>
    </>
  );
}
