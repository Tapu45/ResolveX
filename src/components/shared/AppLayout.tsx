"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const publicRoutes = ["/", "/pricing", "/about", "/features"];
const authRoutes = ["/sign-in", "/sign-up", "/onboarding"];

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    publicRoutes.some((route) => pathname.startsWith(route + "/"));

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  const showLayout = !isPublicRoute && !isAuthRoute;

  if (!showLayout) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole="agent" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
