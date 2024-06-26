import { getServerSession } from "next-auth";
import Link from "next/link";

import UnauthorizedPage from "../unauthorized";
import {
  Receipt,
  FilePen,
  Store,
  User,
  Bookmark,
  ShoppingCart,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth-options";

function MyButton({
  Icon,
  href,
  text,
}: {
  Icon: React.ReactNode;
  href: string;
  text: string;
}) {
  return (
    <Link href={href}>
      <Button
        variant={"outline"}
        className="flex h-12 w-full items-center justify-start space-x-2 pl-4 shadow-sm"
      >
        {Icon}
        <p>{text}</p>
      </Button>
    </Link>
  );
}

export default async function MyPage() {
  const session = await getServerSession(authOptions);
  if (!session) return <UnauthorizedPage />;

  return (
    <>
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={session?.user.image as string} />
          <AvatarFallback>
            {session?.user.name?.slice(0, 1) as string}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg">{session?.user.name}</p>
          <div className="text-xs font-normal text-muted-foreground">
            {session?.user.role}
          </div>
        </div>
      </div>

      <Separator />

      <div className="md:grid-col-3 grid w-full grid-cols-2 gap-2">
        <MyButton Icon={<User />} href="/my/account" text="Account" />
        <MyButton
          Icon={<Receipt />}
          href="/my/reservations"
          text="Reservations"
        />
        <MyButton Icon={<FilePen />} href="/my/posts" text="Posts" />
        <MyButton Icon={<Store />} href="/my/stores" text="Stores" />
        <MyButton Icon={<ShoppingCart />} href="/my/cart/all" text="Cart" />
        <MyButton
          Icon={<Bookmark />}
          href="/my/collections"
          text="Collections"
        />
      </div>
    </>
  );
}
