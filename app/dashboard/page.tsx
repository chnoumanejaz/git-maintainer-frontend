import React from 'react';
import GitCredentialsForm from './_components/git-credentials-form';

const Dashboard = () => {
  return (
    <div className="mx-2 md:mx-8 md:space-y-6">
      <h1 className="text-xl md:text-2xl font-bold mt-4 md:mt-8">
        Maintainer Dashboard
      </h1>

      <div className="flex justify-center">
        <GitCredentialsForm />
      </div>
    </div>
  );
};

export default Dashboard;
