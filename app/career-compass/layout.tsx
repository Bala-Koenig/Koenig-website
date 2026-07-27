import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Career Compass — Fit Score, Skill Gaps & a Free Course | Koenig Solutions",
  description: "Upload your CV and any job posting. Get a fit score, a precise skill-gap breakdown, a free personalized AI course to close each gap, and a certificate — in about 60 seconds.",
  openGraph: {
    title: "Free AI Career Compass — Fit Score, Skill Gaps & a Free Course | Koenig Solutions",
    description: "Upload your CV and any job posting. Get a fit score, a precise skill-gap breakdown, a free personalized AI course to close each gap, and a certificate — in about 60 seconds.",
    siteName: "Koenig Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Career Compass — Fit Score, Skill Gaps & a Free Course | Koenig Solutions",
    description: "Upload your CV and any job posting. Get a fit score, a precise skill-gap breakdown, a free personalized AI course to close each gap, and a certificate — in about 60 seconds.",
  },
};

export default function CareerCompassLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
