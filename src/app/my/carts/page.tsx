import { getServerSession } from "next-auth";

import { eq } from "drizzle-orm";

import GridContainer from "@/components/grid-container";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { carts } from "@/db/schema";
import { authOptions } from "@/lib/auth-options";

import CartItem from "./_components/cart-item";
import ConfirmButton from "./_components/confirm-button";

export default async function MyCartsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>Not Authorized</div>;
  }

  const cartItem = await db.query.carts.findMany({
    where: eq(carts.userId, session?.user.id),
    with: {
      storeDish: true,
    },
    orderBy: (carts, { desc }) => [desc(carts.id)],
  });

  const totalPrice = cartItem.reduce((total, cartItem) => {
    return total + cartItem.storeDish.price * cartItem.quantity;
  }, 0);

  return (
    <>
      <p className="text-xl font-bold">Cart</p>

      <GridContainer>
        {cartItem.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            id={cartItem.id}
            name={cartItem.storeDish.name}
            quantity={cartItem.quantity}
            price={cartItem.storeDish.price}
            image={cartItem.storeDish.image}
          />
        ))}
      </GridContainer>

      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold text-slate-600">
          Total{"  "}${totalPrice}
        </p>
        <ConfirmButton cartItem={cartItem}></ConfirmButton>
      </div>

      <Separator />
    </>
  );
}
