import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/auth";
import Link from 'next/link';
import './globals.css'
import { Button } from '@/components/ui/button';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/tasks');
  }

  return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#f0f4ff] to-[#e6f0ff] p-4">
        <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            <p className="mt-2 text-gray-600">
              Organize your work and boost your productivity
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <Link href="/login" className="block">
              <Button className="w-full" size="lg">
                Sign In
              </Button>
            </Link>

            <Link href="/register" className="block">
              <Button variant="outline" className="w-full" size="lg">
                Create Account
              </Button>
            </Link>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
            <p>Get started by signing in or creating a new account</p>
          </div>
        </div>
      </main>
  );
}