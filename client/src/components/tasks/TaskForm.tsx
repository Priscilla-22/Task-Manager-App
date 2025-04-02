"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Task } from "@/types";
import {Loader2} from "lucide-react";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    completed: z.boolean().optional(),
});
export type TaskFormValues = z.infer<typeof formSchema>;


interface TaskFormProps {
    task?: Task;
    onCancel?: () => void;
    onSuccess?: () => void;
    onSubmit?: (values: TaskFormValues) => Promise<void> | void;
    onSubmitWithReset?: (values: TaskFormValues, resetForm: () => void) => Promise<void> | void;
}

export default function TaskForm({
                                     task,
                                     onCancel,
                                     onSuccess,
                                     onSubmit,
                                     onSubmitWithReset,
                                 }: TaskFormProps) {
    const form = useForm<TaskFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: task?.title || "",
            description: task?.description || "",
            completed: task?.completed || false,
        },
    });

    const handleSubmit = async (values: TaskFormValues) => {
        try {
            if (onSubmitWithReset) {
                await onSubmitWithReset(values, form.reset);
            } else if (onSubmit) {
                await onSubmit(values);
            }
            toast.success(`Task ${task ? "updated" : "created"} successfully`);
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error(error);
            toast.error(`Failed to ${task ? "update" : "create"} task`);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Task title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Task description"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end space-x-2">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? (
                            <span className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {task ? "Updating..." : "Creating..."}
        </span>
                        ) : (
                            task ? "Update Task" : "Create Task"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}