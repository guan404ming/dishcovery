import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

type DialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function DialogMessage({open, setOpen}:DialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save</DialogTitle>
          </DialogHeader>
          <Label htmlFor="name" className="">
            time
          </Label>
          <Input
              id="time"
              defaultValue="9:30"
          />
          <Label htmlFor="username" className="">
            unit
          </Label>
          <Input
              id="unit"
              defaultValue="2"
          />
        <DialogFooter>
          <Button type="submit">cancel</Button>
          <Button type="submit">confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    );
  }