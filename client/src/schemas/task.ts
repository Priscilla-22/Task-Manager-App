import { z } from "zod";

export const taskFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    completed: z.boolean().optional(),
    owner_id: z.string().min(1, "Owner ID is required") // Add if required

});

export type TaskFormValues = z.infer<typeof taskFormSchema>;