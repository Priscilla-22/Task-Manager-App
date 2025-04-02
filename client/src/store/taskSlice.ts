import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@/types";

interface TasksState {
    tasks: Task[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    status: "idle",
    error: null,
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        // Add a new task
        taskAdded(state, action: PayloadAction<Task>) {
            state.tasks.push(action.payload);
        },
        // Update an existing task
        taskUpdated(state, action: PayloadAction<Task>) {
            const { id } = action.payload;
            const existingTask = state.tasks.find((task) => task.id === id);
            if (existingTask) {
                Object.assign(existingTask, action.payload);
            }
        },
        // Delete a task
        taskDeleted(state, action: PayloadAction<string>) {
            const id = action.payload;
            state.tasks = state.tasks.filter((task) => task.id !== id);
        },
        // Set all tasks (useful after fetching)
        tasksLoaded(state, action: PayloadAction<Task[]>) {
            state.tasks = action.payload;
            state.status = "succeeded";
        },
        // Set loading state
        tasksLoading(state) {
            state.status = "loading";
        },
        // Set error state
        tasksFailed(state, action: PayloadAction<string>) {
            state.status = "failed";
            state.error = action.payload;
        },
    },
});

export const {
    taskAdded,
    taskUpdated,
    taskDeleted,
    tasksLoaded,
    tasksLoading,
    tasksFailed,
} = taskSlice.actions;

export default taskSlice.reducer;


export const selectAllTasks = (state: { tasks: TasksState }) => state.tasks.tasks;
export const selectTasksStatus = (state: { tasks: TasksState }) => state.tasks.status;
export const selectTasksError = (state: { tasks: TasksState }) => state.tasks.error;