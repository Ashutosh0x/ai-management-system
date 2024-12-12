"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from 'lucide-react'
import { useProjects } from "@/components/project-provider"
import { TaskDialog } from "@/components/task-dialog"

type Task = {
  id: string
  content: string
  description?: string
  assignee?: string
}

type Column = {
  id: string
  title: string
  tasks: Task[]
}

export function KanbanBoard() {
  const { currentProject } = useProjects()
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      tasks: [
        { id: "task-1", content: "Create login page" },
        { id: "task-2", content: "Design database schema" },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [
        { id: "task-3", content: "Implement user authentication" },
        { id: "task-4", content: "Set up CI/CD pipeline" },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        { id: "task-5", content: "Project setup" },
        { id: "task-6", content: "Create project roadmap" },
      ],
    },
  ])

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // Dropped outside the list
    if (!destination) {
      return
    }

    // Moved within the same column
    if (source.droppableId === destination.droppableId) {
      const column = columns.find((col) => col.id === source.droppableId)
      if (column) {
        const newTasks = Array.from(column.tasks)
        const [reorderedItem] = newTasks.splice(source.index, 1)
        newTasks.splice(destination.index, 0, reorderedItem)

        const newColumns = columns.map((col) =>
          col.id === source.droppableId ? { ...col, tasks: newTasks } : col
        )

        setColumns(newColumns)
      }
    } else {
      // Moved to a different column
      const sourceColumn = columns.find((col) => col.id === source.droppableId)
      const destColumn = columns.find((col) => col.id === destination.droppableId)

      if (sourceColumn && destColumn) {
        const sourceTasks = Array.from(sourceColumn.tasks)
        const destTasks = Array.from(destColumn.tasks)
        const [movedItem] = sourceTasks.splice(source.index, 1)
        destTasks.splice(destination.index, 0, movedItem)

        const newColumns = columns.map((col) => {
          if (col.id === source.droppableId) {
            return { ...col, tasks: sourceTasks }
          }
          if (col.id === destination.droppableId) {
            return { ...col, tasks: destTasks }
          }
          return col
        })

        setColumns(newColumns)
      }
    }
  }

  const addNewTask = (columnId: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      content: "New Task",
    }
    setColumns(columns.map(column => 
      column.id === columnId 
        ? { ...column, tasks: [...column.tasks, newTask] }
        : column
    ))
    setSelectedTask(newTask)
    setIsTaskDialogOpen(true)
  }

  const updateTask = (updatedTask: Task) => {
    setColumns(columns.map(column => ({
      ...column,
      tasks: column.tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    })))
    setIsTaskDialogOpen(false)
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{currentProject?.name || "Project Board"}</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <div key={column.id} className="w-80 flex-shrink-0">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {column.title}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => addNewTask(column.id)}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2 min-h-[200px]"
                      >
                        {column.tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-2 bg-secondary rounded-md cursor-pointer"
                                onClick={() => {
                                  setSelectedTask(task)
                                  setIsTaskDialogOpen(true)
                                }}
                              >
                                {task.content}
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </DragDropContext>
      <TaskDialog
        isOpen={isTaskDialogOpen}
        onClose={() => setIsTaskDialogOpen(false)}
        task={selectedTask}
        onUpdate={updateTask}
      />
    </>
  )
}
