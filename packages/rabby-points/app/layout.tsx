import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rabby Points - Rabby Wallet",
  description: "The game-changing wallet for Ethereum and all EVM chains",
  twitter: {
    card: "summary_large_image",
    images: "assets/rabby-points/post.png",
    site: "@Rabby_io",
    description: "The game-changing wallet for Ethereum and all EVM chains",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
