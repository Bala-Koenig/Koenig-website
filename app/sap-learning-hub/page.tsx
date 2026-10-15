import Navbar from '@/components/Navbar'

export default function SapLearningHubPage() {
  return (
    <div>
      <Navbar />
      <iframe
        src="/sap-learning-hub.html"
        title="SAP Learning Hub"
        className="w-full border-0"
        style={{ height: 'calc(100vh - 80px)' }}
      />
    </div>
  )
}
