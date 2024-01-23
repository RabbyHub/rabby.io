import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // metadataBase: new URL(
  //   "https://rabby.io/rabby-points"
  // ),
  metadataBase: new URL("https://rabby-io-git-feat-points-debanker.vercel.app"),
  title: "Rabby Points - Rabby Wallet",
  description: "The game-changing wallet for Ethereum and all EVM chains",
  twitter: {
    card: "summary_large_image",
    images: "/rabby-points/assets/rabby-points/post.png",
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
