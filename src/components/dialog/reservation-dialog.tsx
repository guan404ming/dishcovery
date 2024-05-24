"use client";

import { useRef, useState } from "react";

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
import { cn } from "@/lib/utils";

import LoginDialog from "./login-dialog";

type DialogProps = {
  dishQuantity: number;
  dishId: number;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ReservationDialog({
  dishId,
  dishQuantity,
  title,
  open,
  onOpenChange,
}: DialogProps) {
  const numberRef = useRef<number>(0);
  const { createPostReservation } = usePost();
  const { addToCart } = useCart();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [error, setError] = useState("");

  if (!session) {
    return (
      <LoginDialog title={title} open={open} onOpenChange={onOpenChange} />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-start text-2xl">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid items-center gap-2">
          <Label htmlFor="number">Quantity</Label>
          <Input
            placeholder="number"
            type="number"
            className={cn(
              "rounded-md border border-gray-300 p-2",
              error && "text-red-500",
            )}
            onChange={(e) => {
              setError("");
              numberRef.current = parseInt(e.target.value);
              if (numberRef.current > dishQuantity) {
                setError(`The number should be less than ${dishQuantity}`);
              }
            }}
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant={"outline"}
            className="block w-full"
            onClick={() => {
              onOpenChange(!open);
              setError("");
            }}
          >
            cancel
          </Button>
          <Button
            className="block w-full"
            onClick={() => {
              onOpenChange(!open);
              setError("");
              if (pathname.includes("post")) {
                createPostReservation({
                  postDishId: dishId,
                  quantity: numberRef.current,
                  dishQuantity,
                });
              } else {
                addToCart(dishId, numberRef.current);
              }
            }}
            disabled={error !== ""}
          >
            confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
