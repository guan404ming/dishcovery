"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Store, FilePen, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import type { SelectPost, SelectStore } from "@/lib/type";
import { cn } from "@/lib/utils";

export function SearchBar({
  postList,
  storeList,
}: {
  postList: SelectPost[];
  storeList: SelectStore[];
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Button
        variant={"ghost"}
        onClick={() => setOpen(!open)}
        className="rounded-full bg-[#F3F3F3]"
      >
        <div className="flex w-full items-center justify-start space-x-2">
          <Search size={18} />
          <span>Search in Dishcovery</span>
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className={cn("rounded-lg border shadow-md")}>
          <CommandInput placeholder="Search 🔥" />

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Stores">
              {storeList.map((store) => (
                <CommandItem
                  key={store.id}
                  onSelect={() => router.push(`/store/${store.id}`)}
                >
                  <Store className="mr-2 h-4 w-4" />
                  <span>{store.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Posts">
              {postList.map((post) => (
                <CommandItem
                  key={post.id}
                  onSelect={() => router.push(`/post/${post.id}`)}
                >
                  <FilePen className="mr-2 h-4 w-4" />
                  <span>{post.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
