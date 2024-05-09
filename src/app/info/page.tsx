import InfoTab from "@/app/info/_components/info-tab";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const user = {
  name: "Prof. Chen",
  role: "Pro",
};

export default async function Info() {
  return (
    <>
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback>W</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg">{user.name}</p>
          <div className="text-xs font-normal text-muted-foreground">
            {user.role}
          </div>
        </div>
      </div>

      <Separator />

      <InfoTab />
    </>
  );
}
