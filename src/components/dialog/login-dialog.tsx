"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

type DialogProps = {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ReservationDialog({
  title,
  open,
  onOpenChange,
}: DialogProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="w-[80%] max-w-[400px] rounded">
        <DrawerHeader>
          <DrawerTitle className="flex justify-start text-2xl">
            {title}
          </DrawerTitle>
        </DrawerHeader>

        <div className="grid max-w-sm items-center gap-2">
          <p className="text-left">Please sign in to continue</p>
        </div>

        <DrawerFooter className="gap-2">
          <Button
            variant={"outline"}
            className="block w-full"
            onClick={() => onOpenChange(!open)}
          >
            close
          </Button>
          <Button className="block w-full" onClick={() => signIn()}>
            Login
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
