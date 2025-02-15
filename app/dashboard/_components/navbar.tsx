import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const DashboardNavBar = () => {
  return (
    <nav className="sticky bottom-0 w-full bg-gray-200 p-2 border-t border-primary/20 rounded-t-md shadow-sm flex justify-center space-x-4">
      <Button asChild>
        <Link href="/">Home</Link>
      </Button>
      <Button>Logout</Button>
    </nav>
  );
};

export default DashboardNavBar;
