import '@unocss/reset/tailwind.css';
import '@/styles/globals.css';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50 min-h-screen">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}