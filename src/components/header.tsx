"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { User, ShoppingCart, Bookmark, LogOut } from "lucide-react";

import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-6 py-4 drop-shadow">
      <Link className="flex items-center" href="/">
        <span className="text-2xl font-bold">Dishcovery</span>
      </Link>
      {!session ? (
        <Button className="h-8 w-20" onClick={() => signIn()}>
          Login
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="ml-4 h-9 w-9">
              <AvatarImage src={session.user.image as string} />
              <AvatarFallback>W</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute -right-4 w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <Link href="/info">Info</Link>
              <DropdownMenuShortcut>⌘I</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <ShoppingCart className="mr-2 h-4 w-4" />
              <Link href="/cart/123">Cart</Link>
              <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Bookmark className="mr-2 h-4 w-4" />
              <Link href="/collections">Collection</Link>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4 text-red-600" />
              <Link href="#" className="text-red-600">
                Logout
              </Link>
              <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
