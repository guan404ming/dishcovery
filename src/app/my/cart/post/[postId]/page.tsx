import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import CartConfirmButton from "../../_components/cart-confirm-button";
import CartItem from "../../_components/cart-item";
import { eq, and } from "drizzle-orm";
import { ShoppingCart } from "lucide-react";

import UnauthorizedPage from "@/app/unauthorized";
import GridContainer from "@/components/grid-container";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { postCarts, postDishes } from "@/db/schema";
import { authOptions } from "@/lib/auth-options";

export default async function MyPostCartPage({
  params,
}: {
  params: { postId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) return <UnauthorizedPage />;

  const cartItem = await db
    .select({
      postDishes: postDishes,
      postCarts,
    })
    .from(postCarts)
    .where(
      and(
        eq(postCarts.userId, session.user.id),
        eq(postDishes.postId, parseInt(params.postId)),
      ),
    )
    .innerJoin(postDishes, eq(postDishes.id, postCarts.postDishId));

  const totalPrice = cartItem.reduce((total, cartItem) => {
    return total + cartItem.postDishes.price * cartItem.postCarts.quantity;
  }, 0);

  if (cartItem.length === 0) {
    redirect("/my/cart/all");
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
            key={cartItem.postCarts.id}
            id={cartItem.postCarts.id}
            name={cartItem.postDishes.name}
            quantity={cartItem.postCarts.quantity}
            price={cartItem.postDishes.price}
            image={cartItem.postDishes.image}
            dishQuantity={cartItem.postDishes.quantity}
            isPost={true}
          />
        ))}
      </GridContainer>
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold text-slate-600">
          Total{"  "}${totalPrice}
        </p>
        <CartConfirmButton
          isPost={true}
          cartItem={cartItem.map((cart) => ({
            storeDishes: cart.postDishes,
            carts: cart.postCarts,
          }))}
        ></CartConfirmButton>
      </div>
      <Separator />
    </>
  );
}
