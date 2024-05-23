import { getServerSession } from "next-auth";

import UnauthorizedPage from "../unauthorized";

import { authOptions } from "@/lib/auth-options";

export default async function MyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) return <UnauthorizedPage />;

  return <>{children}</>;
}
