"use client"; // Enable client-side rendering

import localFont from "next/font/local";
import { EmailProvider } from "./context/context";
import Navibar from "./components/navbar";
import { usePathname } from "next/navigation"; // Import usePathname
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current pathname
  const isAuthRoute = pathname === '/login' || pathname === '/login/signup'; // Combine conditions

  return (
    <EmailProvider>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
          {!isAuthRoute && <Navibar />}
          {children}
        
      </body>
    </html>
    </EmailProvider>
  );
}
