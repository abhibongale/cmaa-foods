import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cmaa-foods",
  description: "Authentic Puneeri Crunch, Delivered",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#FDFBF7] text-[#4A4A4A]`}>
        {children}
      </body>
    </html>
  );
}