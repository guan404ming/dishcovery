/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function handleFetch({
  data,
  method,
  url,
}: {
  data: any;
  method: string;
  url: string;
}) {
  const res = await fetch(url, {
    method,
    body: JSON.stringify({ ...data }),
  });

  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error);
  }
}
