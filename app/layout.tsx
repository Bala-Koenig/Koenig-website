import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Koenig Solutions — IT Training & Certification",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
