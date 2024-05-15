import { getServerSession } from "next-auth";

import { eq } from "drizzle-orm";

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
      user: true,
      storeDish: true,
    },
  });
  console.log(cartItem);

  return (
    <>
      <p className="text-xl font-bold">Cart</p>

      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold text-slate-600">
          Total{"  "}${1000}
        </p>
        <Button>Confirm</Button>
      </div>

      <Separator />
    </>
  );
}
