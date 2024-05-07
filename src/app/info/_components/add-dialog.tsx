"use client";

import { useEffect, useState } from "react";

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
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: string;
};

export default function AddDialog({ open, onOpenChange, type }: DialogProps) {
  const [dialogOpen, setDialogOpen] = useState(open);

  useEffect(() => {
    onOpenChange(dialogOpen);
  }, [dialogOpen, onOpenChange]);

  const handleSave = async () => {
    setDialogOpen(false);
    return true;
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setDialogOpen(true);
    } else {
      setDialogOpen(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="m-2 w-80 sm:w-screen">
        <DialogHeader>
          <DialogTitle className="flex justify-start text-lg lg:text-xl">
            Add {type}
          </DialogTitle>
          <DialogDescription className="text-md lg:text-md flex justify-start">
            請填寫 {type} 資訊
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <div className="lg:text-md flex flex-row items-center gap-x-4 text-sm">
            餐點名稱
            <input
              placeholder="dish"
              type="text"
              className="w-1/2 rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <div className="lg:text-md flex flex-row items-center gap-x-4 text-sm">
            領取地點
            <input
              placeholder="location"
              type="text"
              className="w-1/2 rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <div className="lg:text-md flex flex-row items-center gap-x-4 text-sm">
            剩餘數量
            <input
              placeholder="number"
              type="number"
              className="w-1/2 rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <div className="lg:text-md flex flex-row items-center gap-x-4 text-sm">
            <textarea
              placeholder="Write some description"
              className="w-2/3 rounded-md border border-gray-300 p-2"
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <DialogFooter>
            <Button onClick={handleSave}>confirm</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
