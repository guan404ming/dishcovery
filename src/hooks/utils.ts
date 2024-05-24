import { toast } from "sonner";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function handleFetch({
  data,
  method,
  url,
  successMessage,
  errorMessage,
  setLoading,
}: {
  data: any;
  method: string;
  url: string;
  successMessage?: string;
  errorMessage?: string;
  setLoading: (loading: boolean) => void;
}) {
  setLoading(true);

  try {
    const res = await fetch(url, {
      method,
      body: JSON.stringify({ ...data }),
    });

    if (successMessage && res.ok) {
      toast(successMessage);
    }

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    return await res.json();
  } catch (error) {
    toast(errorMessage || (error as Error).message);
  }

  setLoading(false);
}
