import { Metadata } from "next"
import { JiraLayout } from "@/components/jira-layout"
import { KanbanBoard } from "@/components/kanban-board"

export const metadata: Metadata = {
  title: "Dashboard | AI-Driven Project Management",
  description: "Overview of your projects and tasks",
}

export default function DashboardPage() {
  return (
    <JiraLayout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <KanbanBoard />
    </JiraLayout>
  )
}
