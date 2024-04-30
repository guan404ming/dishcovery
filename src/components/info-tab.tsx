import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function InfoTab() {
  return (
    <Tabs defaultValue="purchase" className="w-full">
      <div className="flex w-full items-center justify-between">
        <TabsList>
          <TabsTrigger value="purchase" className="pl-0">
            Purchase
          </TabsTrigger>
          <TabsTrigger value="post" className="border-x">
            Post
          </TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
        </TabsList>

        <Button
          variant="ghost"
          size="icon"
          className="flex flex-col items-center justify-center"
        >
          <PlusCircle size={18} strokeWidth={1.5} />
        </Button>
      </div>

      <TabsContent value="purchase">Changes to your Purchase here.</TabsContent>
      <TabsContent value="post">Change your Post here.</TabsContent>
      <TabsContent value="store">Change your Store here.</TabsContent>
    </Tabs>
  );
}
