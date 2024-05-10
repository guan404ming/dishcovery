"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

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
  const numberRef = useRef<number>(0);
  const timeRef = useRef<string>();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] max-w-[400px] rounded">
        <DialogHeader>
          <DialogTitle className="flex justify-start text-2xl">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="time">領取時間</Label>
          <Input
            type="time"
            className="rounded-md border border-gray-300 p-2"
            required
            onChange={(e) => {
              timeRef.current = e.target.value;
            }}
          />
        </div>

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
              console.log(numberRef.current, timeRef.current);
            }}
          >
            confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
