'use client';
import { Button } from '@/components/ui/button';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants';
import { removeCookie } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DashboardNavBar = () => {
  const router = useRouter();

  const logout = () => {
    removeCookie([ACCESS_TOKEN, REFRESH_TOKEN]);
    router.push('/auth/login');
  };

  return (
    <nav className="sticky bottom-0 w-full bg-gray-200 p-2 border-t border-primary/20 rounded-t-md shadow-sm flex justify-center space-x-4">
      <Button asChild>
        <Link href="/">Home</Link>
      </Button>
      <Button onClick={logout}>Logout</Button>
    </nav>
  );
};

export default DashboardNavBar;
