import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

type DialogProps = {
  type: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function DialogMessage({type, open, setOpen}:DialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[300px]">
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">{type}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center gap-4">
            <Label htmlFor="name" className="text-lg">
              Time
            </Label>
            <Input
                id="time"
                type="time"
                defaultValue="9:30"
            />
          </div>
          <div className="flex items-center justify-center gap-4">
            <Label htmlFor="username" className="text-lg">
              Unit
            </Label>
            <Input
                id="unit"
                defaultValue="2"
                className="ml-2"
            />
          </div>
        <DialogFooter className="flex gap-4 justify-center">
          <Button type="submit" className="w-full" onClick={()=>setOpen(false)}>cancel</Button>
          <Button type="submit" className="w-full" onClick={()=>setOpen(false)}>confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    );
  }