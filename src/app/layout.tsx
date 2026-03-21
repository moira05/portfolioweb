import type { Metadata } from "next";
import { Manrope, Urbanist, Vollkorn, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ClarityInit from "@/components/ClarityInit";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const vollkorn = Vollkorn({
  variable: "--font-vollkorn",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Portfolio — Moira",
  description: "Portfolio personal de Moira, Product Designer",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${manrope.variable} ${urbanist.variable} ${vollkorn.variable} ${spaceMono.variable} antialiased`}
      >
        <ClarityInit />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
