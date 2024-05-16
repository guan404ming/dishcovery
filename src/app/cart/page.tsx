import { getServerSession } from "next-auth";

import { eq } from "drizzle-orm";

import CartItem from "@/components/cartitem";
import GridContainer from "@/components/grid-container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { carts } from "@/db/schema";
import { authOptions } from "@/lib/auth-options";

export default async function Cart() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <div>Not Authorized</div>;
  }

  const cartItem = await db.query.carts.findMany({
    where: eq(carts.id, session?.user.id),
    with: {
      storeDish: true,
    },
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
            isCounter={true}
          />
        ))}
      </GridContainer>

      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold text-slate-600">
          Total{"  "}${totalPrice}
        </p>
        <Button>Confirm</Button>
      </div>

      <Separator />
    </>
  );
}
