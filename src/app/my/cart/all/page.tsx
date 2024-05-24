import { getServerSession } from "next-auth";

import CartStoreItem from "../_components/cart-store-item";
import { eq } from "drizzle-orm";
import { ShoppingCart } from "lucide-react";

import UnauthorizedPage from "@/app/unauthorized";
import GridContainer from "@/components/grid-container";
import { db } from "@/db";
import { carts, storeDishes, stores } from "@/db/schema";
import { authOptions } from "@/lib/auth-options";

export default async function MyAllCartPage() {
  const session = await getServerSession(authOptions);
  if (!session) return <UnauthorizedPage />;

  if (!session?.user) {
    return <UnauthorizedPage />;
  }

  const cartItem = await db
    .selectDistinct({
      stores,
    })
    .from(carts)
    .where(eq(carts.userId, session.user.id))
    .innerJoin(storeDishes, eq(storeDishes.id, carts.storeDishId))
    .innerJoin(stores, eq(stores.id, storeDishes.storeId));

  if (cartItem.length === 0) {
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
        {cartItem.map((cartItem) => (
          <CartStoreItem key={cartItem.stores.id} store={cartItem.stores} />
        ))}
      </GridContainer>
    </>
  );
}
