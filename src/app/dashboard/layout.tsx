"use client";
import React from "react";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
