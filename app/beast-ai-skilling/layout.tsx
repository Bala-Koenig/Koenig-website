import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B.E.A.S.T. AI — Role-Based AI Skilling for Teams | Koenig Solutions",
  description: "AI is a different beast. Role-based AI training, hands-on workshops with real tools, and a live sandbox to test in — built around what your team actually does.",
  openGraph: {
    title: "B.E.A.S.T. AI — Role-Based AI Skilling for Teams | Koenig Solutions",
    description: "AI is a different beast. Role-based AI training, hands-on workshops with real tools, and a live sandbox to test in — built around what your team actually does.",
    siteName: "Koenig Solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "B.E.A.S.T. AI — Role-Based AI Skilling for Teams | Koenig Solutions",
    description: "AI is a different beast. Role-based AI training, hands-on workshops with real tools, and a live sandbox to test in — built around what your team actually does.",
  },
};

export default function BeastAiSkillingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
