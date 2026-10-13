import Navbar from '@/components/Navbar'

export default function LearningMapPage() {
  return (
    <div>
      <Navbar />
      <iframe
        src="/learning-map.html"
        title="Learning Map"
        className="w-full border-0"
        style={{ height: 'calc(100vh - 80px)' }}
      />
    </div>
  )
}
