import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";


const comic = Inter({ subsets: ["latin"], weight: ["400"] });


export const metadata: Metadata = {
  title: "Aadarsha Khatri | Portfolio",
  description: "Portfolio",
  icons: {
    icon: "app/Icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${comic.className} antialiased bg-[#01071D] scrollbar-thin scrollbar-thumb-sky-500 overflow-y-scroll scrollbar-thumb-rounded-10`}>
        
       
          {children}
        
      </body>
    </html>
  );
}
