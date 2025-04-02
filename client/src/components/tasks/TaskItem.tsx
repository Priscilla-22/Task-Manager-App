"use client";

import { Task } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useUpdateTask, useDeleteTask } from "@/hooks/useTasks";
import { useState } from "react";
import EditTaskForm from "./EditTaskForm";
import { Badge } from "@/components/ui/badge";

export default function TaskItem({ task }: { task: Task }) {
    const [isEditing, setIsEditing] = useState(false);
    const updateTask = useUpdateTask();
    const deleteTask = useDeleteTask();

    const handleStatusChange = (completed: boolean) => {
        updateTask.mutate({ ...task, completed });
    };

    const handleDelete = () => {
        deleteTask.mutate(task.id);
    };

    if (isEditing) {
        return (
            <EditTaskForm
                task={task}
                onCancel={() => setIsEditing(false)}
                onSuccess={() => setIsEditing(false)}
            />
        );
    }

    return (
        <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
                <Checkbox
                    checked={task.completed}
                    onCheckedChange={handleStatusChange}
                />
                <div>
                    <p className={`${task.completed ? "line-through text-gray-400" : ""}`}>
                        {task.title}
                    </p>
                    {task.description && (
                        <p className="text-sm text-gray-500">{task.description}</p>
                    )}
                </div>
            </div>
            <div className="flex items-center space-x-4"> {/* Added items-center */}
                {/* Status Badge */}
                <Badge
                    variant="outline"
                    className={
                        task.completed
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-red-100 text-red-800 border-red-200"
                    }
                >
                    {task.completed ? "Completed" : "Incomplete"}
                </Badge>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsEditing(true)}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    {isEditing && (
                        <EditTaskForm
                            task={task}
                            onCancel={() => setIsEditing(false)}
                            onSuccess={() => setIsEditing(false)}
                        />
                    )}
                    <Button variant="ghost" size="icon" onClick={handleDelete}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}