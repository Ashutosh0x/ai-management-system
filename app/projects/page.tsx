import { Metadata } from "next"
import { JiraLayout } from "@/components/jira-layout"

export const metadata: Metadata = {
  title: "Projects | AI-Driven Project Management",
  description: "Manage and view all your projects",
}

export default function ProjectsPage() {
  return (
    <JiraLayout>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <p>Here you can view and manage all your projects.</p>
    </JiraLayout>
  )
}
