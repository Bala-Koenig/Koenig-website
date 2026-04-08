import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Koenig Solutions — IT Training & Certification",
  description: "Vendor-authorized IT certification training from 350+ expert instructors. 5,000+ courses, guaranteed batch schedules, 95% first-attempt pass rate. 1M+ professionals certified across 195+ countries.",
  openGraph: {
    title: "Koenig Solutions — IT Training & Certification",
    description: "Vendor-authorized IT certification training from 350+ expert instructors. 5,000+ courses, guaranteed batch schedules, 95% first-attempt pass rate. 1M+ professionals certified.",
    siteName: "Koenig Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koenig Solutions — IT Training & Certification",
    description: "Vendor-authorized IT certification training from 350+ expert instructors. 5,000+ courses, guaranteed batch schedules, 95% first-attempt pass rate.",
  },
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
