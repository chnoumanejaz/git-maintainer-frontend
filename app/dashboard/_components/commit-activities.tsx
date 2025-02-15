import { Badge } from '@/components/ui/badge';
import React from 'react';

type CommitData = {
  id: number;
  repo_name: string;
  num_commits: number;
  messages: string[] | null;
  is_pushed: boolean;
  new_repo: boolean;
  created_at: string;
  user: number;
};

const commitData: CommitData[] = [
  {
    id: 28,
    repo_name: 'test-pri-new',
    num_commits: 1,
    messages: [
      'An error occurred while pushing the commits.',
      '401 {"message": "Bad credentials", "documentation_url": "https://docs.github.com/rest", "status": "401"}',
    ],
    is_pushed: false,
    new_repo: false,
    created_at: '2025-02-14T21:50:44.514329Z',
    user: 3,
  },
  {
    id: 29,
    repo_name: 'test-pri-new',
    num_commits: 1,
    messages: [
      'An error occurred while pushing the commits.',
      '401 {"message": "Bad credentials", "documentation_url": "https://docs.github.com/rest", "status": "401"}',
    ],
    is_pushed: false,
    new_repo: true,
    created_at: '2025-02-14T21:50:52.783754Z',
    user: 3,
  },
  {
    id: 46,
    repo_name: 'test-pri-new',
    num_commits: 1,
    messages: [
      'An error occurred while pushing the commits.',
      "'Snippet' object is not subscriptable",
    ],
    is_pushed: false,
    new_repo: false,
    created_at: '2025-02-15T00:49:00.386796Z',
    user: 3,
  },
  {
    id: 47,
    repo_name: 'test-pri-new',
    num_commits: 1,
    messages: null,
    is_pushed: false,
    new_repo: false,
    created_at: '2025-02-15T00:51:08.918868Z',
    user: 3,
  },
  {
    id: 48,
    repo_name: 'test-pri-new',
    num_commits: 1,
    messages: ['Implement basic arithmetic operations'],
    is_pushed: true,
    new_repo: false,
    created_at: '2025-02-15T00:52:24.612659Z',
    user: 3,
  },
  {
    id: 49,
    repo_name: 'leetcode-easy',
    num_commits: 1,
    messages: ['Added basic arithmetic operations functions'],
    is_pushed: true,
    new_repo: true,
    created_at: '2025-02-15T12:38:16.062132Z',
    user: 3,
  },
];

const CommitActivities: React.FC = () => {
  const failedCommitsByDate: { [key: string]: number } = {};
  commitData.forEach(commit => {
    if (!commit.is_pushed) {
      const commitDate = commit.created_at.split('T')[0];
      failedCommitsByDate[commitDate] =
        (failedCommitsByDate[commitDate] || 0) + 1;
    }
  });

  const today = new Date().toISOString().split('T')[0];
  const showAlert = failedCommitsByDate[today] >= 3;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">
        Commit Activities ({commitData.length})
      </h1>
      {showAlert ? (
        <p className="text-red-600 text-sm">
          Please check your credentials, make sure you added write credentials
          of GitHub.
        </p>
      ) : (
        <p className="text-gray-600 text-sm">
          Recent activities on your repositories.
        </p>
      )}
      <div className="border-l-4 border-gray-200 pl-2 mt-5">
        {commitData.map(commit => (
          <div key={commit.id} className="relative mb-6 pl-6">
            <div className="absolute -left-[1.1rem] top-1 w-4 h-4 bg-primary rounded-full border-4 border-white" />
            <div className="flex gap-2">
              <h2 className=" font-semibold">Repository: {commit.repo_name}</h2>
              <Badge variant={commit.new_repo ? 'default' : 'outline'}>
                {commit.new_repo ? 'New repo' : 'Existing repo'}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">
              Commits: {commit.num_commits}
            </p>
            <p className="text-sm text-gray-500">
              Created At: {new Date(commit.created_at).toLocaleString()}
            </p>
            <p
              className={`text-sm font-semibold ${
                commit.is_pushed ? 'text-green-500' : 'text-red-500'
              }`}>
              {commit.is_pushed ? 'Pushed Successfully' : 'Push Failed'}
            </p>
            {commit.messages && commit.messages.length > 0 ? (
              <ul className="mt-2 list-disc pl-5 text-gray-700">
                {commit.messages.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No Activity logs</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommitActivities;
