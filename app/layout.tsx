import type { Metadata } from "next";


import { Inter } from 'next/font/google'
import "./globals.css";
import { twMerge } from 'tailwind-merge';

const inter = Inter({subsets:["latin"]});


export const metadata: Metadata = {
  title: "Aadarsha Khatri | Portfolio",
  description: "Portfolio",
  icons:{
    icon:"app/Icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(inter.className, 'antialiased bg-[#01071D]')}
      >
        {children}
      </body>
    </html>
  );
}
