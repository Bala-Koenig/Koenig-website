import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learning Options for You | Koenig Solutions',
  description: 'Explore every way to learn with Koenig — Live Online Classroom (ILO), Classroom Training, Flexi, 1-on-1 Training, Fly-Me-a-Trainer (FMAT), and Customized Training.',
  keywords: 'learning options, live online classroom, classroom training, flexi training, 1 on 1 training, fly me a trainer, FMAT, customized training',
  alternates: {
    canonical: 'https://www.koenig-solutions.com/learning-options',
  },
  openGraph: {
    title: 'Learning Options for You | Koenig Solutions',
    description: 'Explore every way to learn with Koenig — pick the training format that fits your schedule, team, and goals.',
    url: 'https://www.koenig-solutions.com/learning-options',
    siteName: 'Koenig Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learning Options for You | Koenig Solutions',
    description: 'Explore every way to learn with Koenig — pick the training format that fits your schedule, team, and goals.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
