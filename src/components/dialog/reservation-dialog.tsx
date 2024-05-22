"use client";

import { useRef } from "react";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCart from "@/hooks/use-cart";
import usePost from "@/hooks/use-post";

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

  if (!session) {
    return (
      <LoginDialog title={title} open={open} onOpenChange={onOpenChange} />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] max-w-[400px] rounded">
        <DialogHeader>
          <DialogTitle className="flex justify-start text-2xl">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid max-w-sm items-center gap-2">
          <Label htmlFor="number">預定數量</Label>
          <Input
            placeholder="number"
            type="number"
            className="rounded-md border border-gray-300 p-2"
            required
            onChange={(e) => {
              numberRef.current = parseInt(e.target.value);
            }}
          />
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant={"outline"}
            className="block w-full"
            onClick={() => onOpenChange(!open)}
          >
            cancel
          </Button>
          <Button
            className="block w-full"
            onClick={() => {
              onOpenChange(!open);
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
