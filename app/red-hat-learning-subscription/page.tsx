import Navbar from '@/components/Navbar'

export default function RedHatLearningSubscriptionPage() {
  return (
    <div>
      <Navbar />
      <iframe
        src="/red-hat-learning-subscription.html"
        title="Red Hat Learning Subscription"
        className="w-full border-0"
        style={{ height: 'calc(100vh - 80px)' }}
      />
    </div>
  )
}
