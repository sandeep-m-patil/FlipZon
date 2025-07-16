import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlipZon - E-commerce",
  description: "E-commerce site with role-based access",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
               <AuthProvider>
                 <Navbar />
        {children}
        <Footer />
               </AuthProvider>
       

      </body>
    </html>
  );
}
