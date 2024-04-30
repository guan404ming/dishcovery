import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      
      <Tabs defaultValue="purchase" className="w-full">
        <TabsList>
          <TabsTrigger value="purchase" className="pl-0">
            Purchase
          </TabsTrigger>
          <TabsTrigger value="post" className="border-x">
            Post
          </TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
        </TabsList>
        <TabsContent value="purchase">
          Changes to your Purchase here.
        </TabsContent>
        <TabsContent value="post">Change your Post here.</TabsContent>
        <TabsContent value="store">Change your Store here.</TabsContent>
      </Tabs>
    </>
  );
}
