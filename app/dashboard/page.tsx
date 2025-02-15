'use client';
import React, { useState } from 'react';
import GitCredentialsForm from './_components/git-credentials-form';
import { Button } from '@/components/ui/button';
import GitCommitForm from './_components/git-commit-form';
import CommitActivities from './_components/commit-activities';

const Dashboard = () => {
  const [showCredentialsForm, setShowCredentialsForm] = useState(false);
  const [showAddCommitForm, setShowAddCommitForm] = useState(false);

  return (
    <div className="mx-2 md:mx-8 md:space-y-6">
      {showCredentialsForm ? (
        <div className="flex justify-center mt-4 md:mt-8">
          <GitCredentialsForm />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mt-4 md:mt-8">
            <h1 className="text-xl md:text-2xl font-bold">
              Maintainer Dashboard
            </h1>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <Button
                size="sm"
                onClick={() => setShowAddCommitForm(!showAddCommitForm)}>
                {showAddCommitForm ? 'Show Activities' : 'Add new commit'}
              </Button>
              <Button size="sm" onClick={() => setShowCredentialsForm(true)}>
                Update Github credentials
              </Button>
            </div>
          </div>
          <div className="flex justify-center mt-4 md:mt-8">
            {showAddCommitForm ? <GitCommitForm /> : <CommitActivities />}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
