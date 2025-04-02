"use client";

import { Card } from "@/components/ui/card";
import { Task } from "@/types";
import { useTasks } from "@/hooks/useTasks";
import TaskItem from "./TaskItem";
import CreateTaskForm from "./CreateTaskForm";
import { CustomLoader } from "@/components/custom-loader";

export default function TaskList() {
    const { data: tasks, isLoading, error } = useTasks();

    if (isLoading) {
        return <CustomLoader />;
    }

    if (error) {
        return (
            <Card className="p-4 text-center text-red-500">
                Failed to load tasks. Please try again.
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <CreateTaskForm />
            {tasks?.length === 0 ? (
                <Card className="p-4 text-center text-gray-500">
                    No tasks yet. Create your first task!
                </Card>
            ) : (
                tasks?.map((task: Task) => (
                    <TaskItem key={task.id} task={task} />
                ))
            )}
        </div>
    );
}