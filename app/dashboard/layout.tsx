import React from 'react';
import DashboardNavBar from './_components/navbar';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>

      <DashboardNavBar />
    </div>
  );
};

export default Layout;
