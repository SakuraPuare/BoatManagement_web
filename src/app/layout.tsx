import { Providers } from "@/app/providers";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "航运管理系统",
  description: "智能航运管理系统",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
