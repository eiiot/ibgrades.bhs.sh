import "./globals.css";
import { Fira_Code, Inter } from "next/font/google";
import clsx from "clsx";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fira = Fira_Code({ subsets: ["latin"], variable: "--font-fira" });

export const metadata = {
  title: "IB Grade Boundaries",
  description:
    "A simple website to view IB grade boundaries. Data from the May 2021 session.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.variable,
          fira.variable,
          "bg-black text-white font-mono"
        )}
      >
        {children}
      </body>
    </html>
  );
}
