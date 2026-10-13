import Navbar from '@/components/Navbar'

export default function LearningPathPage() {
  return (
    <div>
      <Navbar />
      <iframe
        src="/learning-path.html"
        title="Learning Path"
        className="w-full border-0"
        style={{ height: 'calc(100vh - 80px)' }}
      />
    </div>
  )
}
