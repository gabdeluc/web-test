import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "NextAuth App - Autenticazione e Gestione Prodotti",
  description: "Applicazione Next.js con autenticazione session-based e gestione prodotti",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="antialiased bg-gradient-to-br from-gray-50 to-white">
        <Header />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
