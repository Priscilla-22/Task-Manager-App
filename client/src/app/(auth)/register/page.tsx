"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import Link from "next/link";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { isAxiosError } from "@/lib/axios";


const formSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores"),
    email: z.string().email("Invalid email address"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password must be at most 50 characters"),
});

export default function RegisterPage() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
        },
    });


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/auth/register", values);
            toast.success("Registration successful! Please login.");
            router.push("/tasks");
        } catch (error) {
            if (isAxiosError(error)) {
                // Handle axios error
                if (error.response?.data) {
                    // Handle array of error messages (FastAPI-style validation errors)
                    if (Array.isArray(error.response.data.detail)) {
                        error.response.data.detail.forEach((err: { msg: string }) => {
                            toast.error(err.msg);
                        });
                    }
                    // Handle single error message
                    else if (error.response.data.detail) {
                        toast.error(error.response.data.detail);
                    }
                    // Handle other error formats
                    else if (error.response.data.message) {
                        toast.error(error.response.data.message);
                    } else {
                        toast.error("Registration failed. Please try again.");
                    }
                } else {
                    toast.error(error.message || "Network error occurred");
                }
            } else if (error instanceof Error) {
                // Handle generic errors
                toast.error(error.message);
            } else {
                // Handle unexpected errors
                toast.error("An unexpected error occurred");
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Create an account</h1>
                    <p className="text-gray-500">Get started with Task Manager</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="johndoe123" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full mt-4">
                            Sign Up
                        </Button>
                    </form>
                </Form>
                <div className="text-center text-sm text-gray-500 pt-2">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-primary hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}