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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

const formSchema = z.object({
    identifier: z.string().min(3, "Username or email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const result = await signIn("credentials", {
                identifier: values.identifier,
                password: values.password,
                redirect: false,
                callbackUrl: "/tasks"
            });

            if (result?.error) {
                if (result.error === "CredentialsSignin") {
                    toast.error("Invalid username/email or password");
                } else {
                    toast.error(result.error);
                }
            } else {
                router.push(result?.url || "/tasks");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An unexpected error occurred");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-gray-500">Sign in to your account</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username or Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="username or email@example.com" {...field} />
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
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </form>
                </Form>
                <div className="text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="font-medium text-primary">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
