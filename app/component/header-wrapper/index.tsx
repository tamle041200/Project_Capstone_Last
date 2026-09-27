"use client";

import { usePathname } from "next/navigation";
import Header from "../header";
import AdminLayout from "../adminHeader";

export default function HeaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
