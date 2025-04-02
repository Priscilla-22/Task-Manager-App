import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Task } from "@/types";

const API_URL = "/api/tasks";

export const useTasks = () => {
    return useQuery<Task[]>({
        queryKey: ["tasks"],
        queryFn: async () => {
            const { data } = await axios.get(API_URL);
            return data;
        },
    });
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (task: {
            title: string;
            description?: string;
            completed: boolean;
            owner_id: string;
        }) => {
            const { data } = await axios.post(API_URL, task);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
        onError: (error) => {
            console.error("Mutation error:", error);
        }
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (task: Task) => {
            const { data } = await axios.put(`${API_URL}/${task.id}`, task);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await axios.delete(`${API_URL}/${id}`);
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};