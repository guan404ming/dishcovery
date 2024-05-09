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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: string;
};

export default function AddDialog({ open, onOpenChange, type }: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] max-w-[400px] rounded">
        <DialogHeader>
          <DialogTitle className="flex justify-start text-lg lg:text-xl">
            Add {type}
          </DialogTitle>
          <DialogDescription className="text-md lg:text-md flex justify-start">
            請填寫 {type} 資訊
          </DialogDescription>
        </DialogHeader>

        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="time">領取時間</Label>
          <Input
            type="time"
            className="rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="place">領取地點</Label>
          <Input
            type="place"
            className="rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="number">剩餘數量</Label>
          <Input
            type="number"
            className="rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="description">商品敘述</Label>
          <Textarea placeholder="寫一些有關餐點的敘述" />
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(!open)}>confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
