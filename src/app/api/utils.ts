import { put } from "@vercel/blob";

export const uploadFile = async (filename: string, file: Blob) => {
  const blob = await put(`banner/${filename}`, file!, {
    access: "public",
  });

  return blob;
};
