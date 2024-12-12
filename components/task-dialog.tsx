"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type Task = {
  id: string
  content: string
  description?: string
  assignee?: string
}

type TaskDialogProps = {
  isOpen: boolean
  onClose: () => void
  task: Task | null
  onUpdate: (task: Task) => void
}

export function TaskDialog({ isOpen, onClose, task, onUpdate }: TaskDialogProps) {
  const [editedTask, setEditedTask] = useState<Task | null>(null)

  useEffect(() => {
    setEditedTask(task)
  }, [task])

  const handleUpdate = () => {
    if (editedTask) {
      onUpdate(editedTask)
    }
    onClose()
  }

  if (!editedTask) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editedTask.id ? "Edit Task" : "New Task"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="task-title" className="text-right">
              Title
            </Label>
            <Input
              id="task-title"
              value={editedTask.content}
              onChange={(e) => setEditedTask({ ...editedTask, content: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="task-description" className="text-right">
              Description
            </Label>
            <Textarea
              id="task-description"
              value={editedTask.description || ""}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="task-assignee" className="text-right">
              Assignee
            </Label>
            <Input
              id="task-assignee"
              value={editedTask.assignee || ""}
              onChange={(e) => setEditedTask({ ...editedTask, assignee: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
