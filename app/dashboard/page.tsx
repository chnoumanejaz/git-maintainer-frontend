'use client';
import { Button } from '@/components/ui/button';
import { GITHUB_TOKEN, GITHUB_USER } from '@/constants';
import { getCookie } from '@/lib/utils';
import { useState } from 'react';
import CommitsHistory from './_components/commits-history';
import GitCommitForm from './_components/git-commit-form';
import GitCredentialsForm from './_components/git-credentials-form';

const Dashboard = () => {
  const [showCredentialsForm, setShowCredentialsForm] = useState(
    getCookie(GITHUB_TOKEN) && getCookie(GITHUB_USER) ? false : true
  );
  const [showAddCommitForm, setShowAddCommitForm] = useState(false);
  const [isEditingCredentials, setIsEditingCredentials] = useState(false);

  return (
    <div className="mx-2 md:mx-8 md:space-y-6">
      {showCredentialsForm ? (
        <div className="flex justify-center mt-4 md:mt-8">
          <GitCredentialsForm
            setShowCredentialsForm={setShowCredentialsForm}
            isEdit={isEditingCredentials}
            setIsEditingCredentials={setIsEditingCredentials}
          />
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
                {showAddCommitForm ? 'Show Commits history' : 'Add new commit'}
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setIsEditingCredentials(true), setShowCredentialsForm(true);
                }}>
                Update Github credentials
              </Button>
            </div>
          </div>
          <div className="flex justify-center mt-4 md:mt-8">
            {showAddCommitForm ? (
              <GitCommitForm setShowAddCommitForm={setShowAddCommitForm} />
            ) : (
              <CommitsHistory />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
