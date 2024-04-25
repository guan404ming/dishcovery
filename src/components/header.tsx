import Link from "next/link";

import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { User, ShoppingCart, LogOut } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-white px-6 py-4 drop-shadow">
      <Link className="flex items-center" href="/">
        <span className="font-bold text-xl">Dishcovery</span>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="ml-4 h-9 w-9">
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
            <Link href="/cart">Cart</Link>
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4 text-red-600" />
            <Link href="#" className="text-red-600">
              Logout
            </Link>
            <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}