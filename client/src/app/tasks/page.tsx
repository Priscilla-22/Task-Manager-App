'use client';

import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import TaskList from '@/components/tasks/TaskList';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ListTodo, LogOut } from 'lucide-react';

export default function TasksPage() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center mb-8">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-24" />
                </div>
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-20 w-full" />
                    ))}
                </div>
            </div>
        );
    }

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white dark:bg-gray-900 border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <ListTodo className="h-5 w-5" />
                        Task Manager
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Hi, {session.user?.name || session.user?.email}
                        </span>
                        <Button
                            variant="outline"
                            onClick={() => signOut()}
                            className="flex items-center gap-2"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="mb-8 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Your Tasks</h2>
                    <div className="flex gap-4">
                    </div>
                </div>
                <TaskList />
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-900 border-t py-4">
                <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} Task Manager
                </div>
            </footer>
        </div>
    );
}