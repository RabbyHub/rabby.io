import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://rabby.io"),
  title: "Rabby Points - Rabby Wallet",
  description: "The game-changing wallet for Ethereum and all EVM chains",
  twitter: {
    card: "summary_large_image",
    images: "/rabby-points/assets/rabby-points/x-post-season2-end.png",
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
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Roboto:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
