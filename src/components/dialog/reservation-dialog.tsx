"use client";

import { useRef, useState } from "react";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCart from "@/hooks/use-cart";
import usePost from "@/hooks/use-post";
import { cn } from "@/lib/utils";

import LoginDialog from "./login-dialog";

type DialogProps = {
  dishId: number;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ReservationDialog({
  dishId,
  title,
  open,
  onOpenChange,
}: DialogProps) {
  const numberRef = useRef<number>(0);
  const { createPostReservation } = usePost();
  const { addToCart } = useCart();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [error, setError] = useState(false);

  if (!session) {
    return (
      <LoginDialog title={title} open={open} onOpenChange={onOpenChange} />
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto w-full max-w-md px-4">
        <DrawerHeader>
          <DrawerTitle className="flex justify-start text-2xl">
            {title}
          </DrawerTitle>
        </DrawerHeader>

        <div className="grid items-center gap-2 p-4">
          <Label htmlFor="number">Quantity</Label>
          <Input
            placeholder="number"
            type="number"
            className={cn(
              "rounded-md border border-gray-300 p-2",
              error && "text-red-500",
            )}
            onChange={(e) => {
              setError(false);
              numberRef.current = parseInt(e.target.value);
              if (numberRef.current > 5) {
                setError(true);
              }
            }}
          />
          {error && (
            <p className="text-red-500">
              {"The number cannot be greater than 5."}
            </p>
          )}
        </div>

        <DrawerFooter className="gap-2">
          <Button
            className="block w-full"
            onClick={() => {
              onOpenChange(!open);
              setError(false);
              if (pathname.includes("post")) {
                createPostReservation({
                  postDishId: dishId,
                  quantity: numberRef.current,
                });
              } else {
                addToCart(dishId, numberRef.current);
              }
            }}
          >
            confirm
          </Button>
          <Button
            variant={"outline"}
            className="block w-full"
            onClick={() => {
              onOpenChange(!open);
              setError(false);
            }}
          >
            cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
