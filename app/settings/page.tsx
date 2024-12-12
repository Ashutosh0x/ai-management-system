import { Metadata } from "next"
import { JiraLayout } from "@/components/jira-layout"

export const metadata: Metadata = {
  title: "Settings | AI-Driven Project Management",
  description: "Manage your account and application settings",
}

export default function SettingsPage() {
  return (
    <JiraLayout>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p>Here you can manage your account and application settings.</p>
    </JiraLayout>
  )
}
