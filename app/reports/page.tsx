import { Metadata } from "next"
import { JiraLayout } from "@/components/jira-layout"

export const metadata: Metadata = {
  title: "Reports | AI-Driven Project Management",
  description: "Generate and view reports for your projects",
}

export default function ReportsPage() {
  return (
    <JiraLayout>
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <p>Here you can generate and view reports for your projects.</p>
    </JiraLayout>
  )
}
