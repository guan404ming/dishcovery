"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useStore from "@/hooks/use-store";
import { UploadButton } from "@/lib/uploadthing";

type DialogProps = {
  storeId: number;
};

export default function AddStoreDishDialog({ storeId }: DialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const { createStoreDish } = useStore();

  const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    quantity: z.number().min(1).max(10000),
    price: z.number().min(1).max(10000),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      quantity: 0,
      price: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, storeId, url);
    if (!url) return;
    createStoreDish({
      ...values,
      image: url,
      storeId,
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <PlusCircle className="h-5 w-5 cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[80%] w-[80%] max-w-[400px] overflow-scroll rounded">
        <DialogHeader>
          <DialogTitle className="flex justify-start text-lg lg:text-xl">
            Add Store Dish
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dish Name*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the name of the dish"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dish Description*</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a brief description of your post"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dish Quantity*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="quantity"
                      type="number"
                      {...field}
                      onChange={(value) =>
                        field.onChange(value.target.valueAsNumber)
                      }
                      min={0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dish Price*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="price"
                      type="number"
                      {...field}
                      onChange={(value) =>
                        field.onChange(value.target.valueAsNumber)
                      }
                      min={0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid w-full max-w-sm items-center gap-2">
              <FormLabel htmlFor="description" className="mb-4">
                Dish Image*
              </FormLabel>
              <UploadButton
                className="w-full text-black"
                endpoint="imageUploader"
                appearance={{ button: "w-full text-black bg-white border" }}
                onClientUploadComplete={(res) => {
                  console.log("Files: ", res);
                  setUrl(res[0].url);
                }}
                onUploadError={(error: Error) => {
                  console.log(`ERROR! ${error.message}`);
                }}
              />
              {url && (
                <Image
                  src={url}
                  alt={""}
                  width={100}
                  height={100}
                  className="aspect-auto w-full border object-cover"
                />
              )}
            </div>

            <Button type="submit" className="mt-4 w-full">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
