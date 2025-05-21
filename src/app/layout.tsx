import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Sukoon",
  description: "Peace of mind, guided by faith.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans bg-brand-light-teal text-brand-text`}>
        {children}
      </body>
    </html>
  );
}
