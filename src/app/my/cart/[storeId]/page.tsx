import { getServerSession } from "next-auth";

import CartConfirmButton from "../_components/cart-confirm-button";
import CartItem from "../_components/cart-item";
import { eq, and } from "drizzle-orm";
import { ShoppingCart } from "lucide-react";

import UnauthorizedPage from "@/app/unauthorized";
import GridContainer from "@/components/grid-container";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { carts, storeDishes } from "@/db/schema";
import { authOptions } from "@/lib/auth-options";

export default async function MyCartPage({
  params,
}: {
  params: { storeId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) return <UnauthorizedPage />;

  if (!session?.user) {
    return <div>Not Authorized</div>;
  }

  const cartItem = await db
    .select({
      storeDishes: storeDishes,
      carts,
    })
    .from(carts)
    .where(
      and(
        eq(carts.userId, session.user.id),
        eq(storeDishes.storeId, parseInt(params.storeId)),
      ),
    )
    .innerJoin(storeDishes, eq(storeDishes.id, carts.storeDishId));

  const totalPrice = cartItem.reduce((total, cartItem) => {
    return total + cartItem.storeDishes.price * cartItem.carts.quantity;
  }, 0);

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
          <CartItem
            key={cartItem.carts.id}
            id={cartItem.carts.id}
            name={cartItem.storeDishes.name}
            quantity={cartItem.carts.quantity}
            price={cartItem.storeDishes.price}
            image={cartItem.storeDishes.image}
            dishQuantity={cartItem.storeDishes.quantity}
          />
        ))}
      </GridContainer>
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold text-slate-600">
          Total{"  "}${totalPrice}
        </p>
        <CartConfirmButton cartItem={cartItem}></CartConfirmButton>
      </div>
      <Separator />
    </>
  );
}
