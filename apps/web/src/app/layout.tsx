import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conversion Rate Tracker",
  description: "a simple conversion rate tracker of PufferFi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
