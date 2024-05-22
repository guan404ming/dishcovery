"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
} from "@/components/ui/drawer";
import usePost from "@/hooks/use-post";
import useStore from "@/hooks/use-store";

type ResStateDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: string;
  id: number;
  quantity: number;
};

export default function ReservationActionDialog({
  open,
  onOpenChange,
  type,
  id,
  quantity,
  isStore = false,
}: ResStateDrawerProps & { isStore?: boolean }) {
  const { finishPostReservation, deletePostReservation } = usePost();
  const { finishStoreReservation, deleteStoreReservation } = useStore();

  const handleConfirm = () => {
    onOpenChange(!open);
    if (isStore) {
      if (type === "cancel") {
        deleteStoreReservation(id);
      } else if (type === "finish") {
        finishStoreReservation(id, quantity);
      }
    } else {
      if (type === "cancel") {
        deletePostReservation(id);
      } else if (type === "finish") {
        finishPostReservation(id, quantity);
      }
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="rounded mx-auto w-full">
        {type === "cancel" && (
          <div className="flex flex-col items-center gap-y-4">
            <DrawerTitle className="text-lg lg:text-xl">
              Cancel Reservation?
            </DrawerTitle>
          </div>
        )}
        {type === "finish" && (
          <div className="flex flex-col items-center gap-y-4">
            <DrawerTitle className="text-center text-lg lg:text-xl">
              Finish reservation?
            </DrawerTitle>
          </div>
        )}
        <DrawerFooter className="gap-2">
          <Button className="block w-full" onClick={handleConfirm}>
            confirm
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
