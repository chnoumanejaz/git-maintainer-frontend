import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-3xl font-bold text-center">
        Landing page is under construction
      </h1>

      <p className="text-gray-600">
        You can navigate to the dashboard by clicking{' '}
      </p>

      <div className="flex space-x-4 mt-8">
        <Button asChild>
          <Link href="/auth/login">Auth</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
