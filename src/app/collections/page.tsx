import { PostListing } from "@/components/post-listing";
import { Separator } from "@/components/ui/separator";

export default async function Info() {
  return (
    <>
      <h2 className="text-xl font-semibold">Collections</h2>
      <Separator />
      <PostListing />
    </>
  );
}
