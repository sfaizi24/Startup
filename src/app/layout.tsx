import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Sukoon",
  description: "Peace of mind, guided by faith.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans bg-brand-light-teal text-brand-text`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
