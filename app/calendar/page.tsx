import { Metadata } from "next"
import { JiraLayout } from "@/components/jira-layout"

export const metadata: Metadata = {
  title: "Calendar | AI-Driven Project Management",
  description: "View your project timeline and scheduled tasks",
}

export default function CalendarPage() {
  return (
    <JiraLayout>
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <p>Here you can view your project timeline and scheduled tasks.</p>
    </JiraLayout>
  )
}
