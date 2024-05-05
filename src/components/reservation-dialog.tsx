"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import dayjs, { Dayjs } from 'dayjs';

type DialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  };

export default function ReservationDialog({
    open,
    onOpenChange
}: DialogProps) {
  const [dialogOpen, setDialogOpen] = useState(open);

  useEffect(() => {
    onOpenChange(dialogOpen);
  }, [dialogOpen, onOpenChange]);

  const handleSave = async () => {
    setDialogOpen(false);
    return true;
  };

  const handleCancel = async () => {
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

  const [time, setTime] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
  
  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="m-2 w-80 sm:w-screen">
        <DialogHeader>
          <DialogTitle className="flex justify-start text-lg lg:text-xl">Reservation</DialogTitle>
          <DialogDescription className="flex justify-start text-md lg:text-md">
            請選擇領取時間與商品數量
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-row items-center gap-x-4 text-sm lg:text-md">
            領取時間
            <input 
              type="time" 
              className="w-1/2 p-2 border border-gray-300 rounded-md" 
              required />
          </div>
          <div className="flex flex-row items-center gap-x-4 text-sm lg:text-md">
            預定數量
            <input 
              placeholder="number"
              type="number"
              className="w-1/2 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-x-4 justify-center">
          <DialogFooter>
            <Button onClick={handleCancel}>cancel</Button>
          </DialogFooter>
          <DialogFooter>
            <Button onClick={handleSave}>confirm</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}