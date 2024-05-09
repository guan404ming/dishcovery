"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ResStateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: string;
};

export default function ResStateDialog({
  open,
  onOpenChange,
  type,
}: ResStateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] max-w-[400px] rounded">
        {type === "cancel" && (
          <div className="flex flex-col items-center gap-y-4">
            <DialogTitle className="text-lg lg:text-xl">
              Cancel Reservation?
            </DialogTitle>
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="number">數量</Label>
              <Input
                type="number"
                className="rounded-md border border-gray-300 p-2"
                required
                placeholder="number"
              />
            </div>
          </div>
        )}
        {type === "finish" && (
          <div>
            <DialogTitle className="text-center text-lg lg:text-xl">
              Finish reservation?
            </DialogTitle>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button className="block w-full" onClick={() => onOpenChange(!open)}>
            confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
