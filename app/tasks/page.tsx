import { Metadata } from "next"
import { JiraLayout } from "@/components/jira-layout"

export const metadata: Metadata = {
  title: "Tasks | AI-Driven Project Management",
  description: "View and manage your tasks across all projects",
}

export default function TasksPage() {
  return (
    <JiraLayout>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <p>Here you can view and manage tasks across all your projects.</p>
    </JiraLayout>
  )
}
