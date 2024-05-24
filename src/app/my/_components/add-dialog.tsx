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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import usePost from "@/hooks/use-post";
import { UploadButton } from "@/lib/uploadthing";

import LocationPicker from "./location-picker";

type DialogProps = {
  type: string;
};

export default function AddDialog({ type }: DialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const formSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    location: z.string().min(1),
    dishName: z.string().min(1),
    dishDescription: z.string().min(1),
    quantity: z.number().min(1).max(10000),
  });

  const { createPost } = usePost();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      dishName: "",
      dishDescription: "",
      quantity: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (!url || !location?.lat || !location?.lng) return;
    createPost({
      ...values,
      name: values.dishName,
      image: url,
      lat: location?.lat,
      lng: location?.lng,
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
            Add {type}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
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
                  <FormLabel>Post Description</FormLabel>
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
            <Separator orientation="horizontal" />
            <FormField
              control={form.control}
              name="dishName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dish Name</FormLabel>
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
              name="dishDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dish Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a brief description of your dish"
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
                  <FormLabel>Dish Quantity</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="quantity"
                      type="number"
                      {...field}
                      onChange={(value) =>
                        field.onChange(value.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid w-full max-w-sm items-center gap-2">
              <FormLabel htmlFor="description" className="mb-4">
                Dish Image
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
            <Separator orientation="horizontal" />

            <div className="grid w-full max-w-sm items-center gap-2">
              <FormLabel htmlFor="locationPicker" className="mb-4">
                Select Location
              </FormLabel>
              <LocationPicker setLocation={setLocation} />
              <div className="w-full text-center text-sm">
                {location?.lat && location?.lng
                  ? `[${location?.lat}, ${location?.lng}]`
                  : "location not selected"}
              </div>
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a brief description of your location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4 w-full">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
