import { eq } from "drizzle-orm";

import { Banner } from "@/components/banner";
import CartItem from "@/components/cartitem";
import GridContainer from "@/components/grid-container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { carts, users, storeDishes } from "@/db/schema";

export default async function Cart({ params }: { params: { cartId: string } }) {
  const bannerList = await db.query.banners.findMany();
  const cart = await db
    .select({
      id: carts.id,
      name: storeDishes.name,
      quantity: carts.quantity,
      price: storeDishes.price,
      image: storeDishes.image,
    })
    .from(carts)
    .where(eq(carts.id, parseInt(params.cartId)))
    .innerJoin(users, eq(carts.userId, users.id))
    .innerJoin(storeDishes, eq(carts.storeDishId, storeDishes.id));

  const totalPrice = cart.reduce((total, cartItem) => {
    return total + cartItem.price * cartItem.quantity;
  }, 0);

  return (
    <>
      <Banner bannerList={bannerList} />
      <p className="text-xl font-bold">Cart</p>

      <GridContainer>
        {cart.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            id={cartItem.id}
            name={cartItem.name}
            quantity={cartItem.quantity}
            price={cartItem.price}
            image={cartItem.image}
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
