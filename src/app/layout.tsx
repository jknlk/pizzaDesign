import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Domino's — Crafted. Delivered. Perfected.",
  description: "Premium pizza crafted with the finest ingredients, delivered to your door. Experience the art of pizza.",
  keywords: ["pizza", "delivery", "dominos", "premium", "fresh"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
