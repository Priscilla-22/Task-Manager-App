"use client";

import { useCreateTask } from "@/hooks/useTasks";
import TaskForm, { type TaskFormValues } from "./TaskForm";
import { useSession } from "next-auth/react";

export default function CreateTaskForm() {
    const createTask = useCreateTask();
    const { data: session } = useSession();

    const handleSubmit = async (values: TaskFormValues, resetForm: () => void) => {
        try {
            await createTask.mutateAsync({
                ...values,
                owner_id: session!.user!.id,
                completed: values.completed || false
            });
            resetForm();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return <TaskForm onSubmitWithReset={handleSubmit} />;
}