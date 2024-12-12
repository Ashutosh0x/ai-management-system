"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react'

type Project = {
  id: string
  name: string
}

type ProjectContextType = {
  projects: Project[]
  currentProject: Project | null
  setCurrentProject: (project: Project) => void
  addProject: (project: Project) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'Project Alpha' },
    { id: '2', name: 'Project Beta' },
  ])
  const [currentProject, setCurrentProject] = useState<Project | null>(projects[0])

  const addProject = (project: Project) => {
    setProjects([...projects, project])
  }

  return (
    <ProjectContext.Provider value={{ projects, currentProject, setCurrentProject, addProject }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  return context
}
