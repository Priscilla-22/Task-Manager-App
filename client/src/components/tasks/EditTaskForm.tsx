"use client";

import { useUpdateTask } from "@/hooks/useTasks";
import TaskForm from "./TaskForm";
import { Task } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface EditTaskFormProps {
    task: Task;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function EditTaskForm({
                                         task,
                                         onCancel,
                                         onSuccess,
                                     }: EditTaskFormProps) {
    const updateTask = useUpdateTask();

    return (
        <Dialog open onOpenChange={onCancel}>
            <DialogContent className="sm:max-w-[425px] bg-white backdrop-blur-sm">
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <TaskForm
                    task={task}
                    onCancel={onCancel}
                    onSuccess={onSuccess}
                    onSubmit={(values) => updateTask.mutateAsync({ ...task, ...values })}
                />
            </DialogContent>
        </Dialog>
    );
}