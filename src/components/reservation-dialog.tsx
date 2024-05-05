"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimeField } from '@mui/x-date-pickers/TimeField';

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
  const titleInputRef = useRef<HTMLInputElement>(null);

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-start">Reservation</DialogTitle>
          <DialogDescription>
            請選擇領取時間與商品數量
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-row items-center gap-x-4">
            領取時間
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimeField']}>
                  <TimeField/>
                </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="flex flex-row items-center gap-x-4">
            預定數量
            <input 
              placeholder="number"
              type="number"
              className="w-1/2 p-2 border border-gray-300 rounded-md"
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