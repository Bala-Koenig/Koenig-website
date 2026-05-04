import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '1-on-1 Training with Expert Instructors | Koenig Solutions',
  description: 'Get fully personalized 1-on-1 IT training with certified expert instructors. Train at your own pace, on your schedule, from anywhere in the world. 5,000+ courses available.',
  keywords: '1 on 1 training, one on one training, personalized IT training, private training, individual training, certified instructor training, online IT training',
  alternates: {
    canonical: 'https://www.koenig-solutions.com/1-on-1-training',
  },
  openGraph: {
    title: '1-on-1 Training with Expert Instructors | Koenig Solutions',
    description: 'Fully personalized IT training with certified experts. Your pace, your schedule, your goals.',
    url: 'https://www.koenig-solutions.com/1-on-1-training',
    siteName: 'Koenig Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '1-on-1 Training with Expert Instructors | Koenig Solutions',
    description: 'Fully personalized IT training with certified experts. Your pace, your schedule, your goals.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
