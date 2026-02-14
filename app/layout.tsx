import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jacob Winsor | Portfolio",
  description:
    "Cybersecurity graduate building practical security, automation, and IoT projects. Case studies, write-ups, and contact.",
  icons: {
    icon: "icon.png",        // browser tab icon
    apple: "icon.png",       // iOS home screen icon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
          <Navbar />
          <div className="pt-16">{children}</div>
        </body>
    </html>
  );
}


