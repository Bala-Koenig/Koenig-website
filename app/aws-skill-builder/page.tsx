import Navbar from '@/components/Navbar'

export default function AwsSkillBuilderPage() {
  return (
    <div>
      <Navbar />
      <iframe
        src="/aws-skill-builder.html"
        title="AWS Skill Builder Subscriptions"
        className="w-full border-0"
        style={{ height: 'calc(100vh - 80px)' }}
      />
    </div>
  )
}
