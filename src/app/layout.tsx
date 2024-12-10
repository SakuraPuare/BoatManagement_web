"use client"

import { useUserStore } from '@/stores/user'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import React from 'react';
import localFont from "next/font/local";
import "./globals.css";
import { initializeApi } from '@/lib/api';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { token } = useUserStore()
  const router = useRouter()
  const pathname = usePathname()
  
  useEffect(() => {
    const publicPaths = ['/', '/login', '/register']
    if (!token && !publicPaths.includes(pathname)) {
      router.push('/login')
    }
  }, [token, pathname])

  initializeApi();
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
