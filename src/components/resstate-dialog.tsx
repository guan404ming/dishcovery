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

type ResStateDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    type: string;
  };

export default function ResStateDialog({
    open,
    onOpenChange,
    type
}: ResStateDialogProps) {
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
  
  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="m-2 w-80 sm:w-screen flex flex-col items-center">
        {type === "cancel" && (
          <div className="flex flex-col gap-y-4 items-center">
            <DialogTitle className="text-lg lg:text-xl">Cancel Reservation?</DialogTitle>
            <div className="flex flex-row items-center justify-center gap-x-4 text-sm lg:text-md">
              數量
              <input 
                placeholder="number"
                type="number"
                className="w-1/2 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
        )}
        {type === "finish" && (
          <div>
            <DialogTitle className="text-center text-lg lg:text-xl">Finish reservation?</DialogTitle>
          </div>
        )}

        <div className="flex flex-row items-center gap-x-4">
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