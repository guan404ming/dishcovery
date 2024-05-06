"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DialogProps = {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ReservationDialog({ title, open, onOpenChange }: DialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="m-2 w-80 sm:w-screen rounded">
        <DialogHeader>
          <DialogTitle className="flex justify-start text-lg lg:text-xl">
            {title}
          </DialogTitle>
          <DialogDescription className="text-md lg:text-md flex justify-start">
            請選擇領取時間與商品數量
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <div className="lg:text-md flex flex-row items-center gap-x-4 text-sm">
            領取時間
            <input
              type="time"
              className="w-1/2 rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <div className="lg:text-md flex flex-row items-center gap-x-4 text-sm">
            預定數量
            <input
              placeholder="number"
              type="number"
              className="w-1/2 rounded-md border border-gray-300 p-2"
              required
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-x-4">
          <DialogFooter>
            <Button onClick={() => onOpenChange(!open)}>cancel</Button>
          </DialogFooter>
          <DialogFooter>
            <Button onClick={() => onOpenChange(!open)}>confirm</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
