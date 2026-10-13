import Navbar from '@/components/Navbar'

export default async function MindMapPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>
}) {
  const { course } = await searchParams
  const src = course
    ? `/course-roadmap.html?course=${encodeURIComponent(course)}`
    : '/course-roadmap.html'

  return (
    <div>
      <Navbar />
      <iframe
        src={src}
        title="Course Mind Map"
        className="w-full border-0"
        style={{ height: 'calc(100vh - 80px)' }}
      />
    </div>
  )
}
