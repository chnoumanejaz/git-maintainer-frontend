'use client';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/axios';
import { CommitData } from '@/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const CommitsHistory = () => {
  const [commitsData, setCommitsData] = useState<CommitData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCommitsData() {
      try {
        const res = await api.get('/history/');
        console.log(res.data);
        setCommitsData(res.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch commits history.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCommitsData();
  }, []);

  if (isLoading) {
    return (
      <p className="text-2xl animate-pulse font-bold mt-20">
        Loading Commits history...
      </p>
    );
  }

  if (!commitsData || commitsData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <p className="text-2xl font-bold">No Commits history found.</p>
        <p className="text-sm text-gray-600">
          Start adding commits by clicking the button above
        </p>
      </div>
    );
  }

  const failedCommitsByDate: { [key: string]: number } = {};
  commitsData.forEach(commit => {
    if (!commit.is_pushed) {
      const commitDate = commit.created_at.split('T')[0];
      failedCommitsByDate[commitDate] =
        (failedCommitsByDate[commitDate] || 0) + 1;
    }
  });
  const today = new Date().toISOString().split('T')[0];
  const showAlert = failedCommitsByDate[today] >= 3;

  return (
    <div className="p-4 bg-gray-100 rounded-lg w-[80%]">
      <h1 className="text-xl font-bold">
        Commits History ({commitsData.length})
      </h1>
      {showAlert ? (
        <p className="text-red-600 text-sm">
          Multiple commit failures detected today. Please verify your GitHub
          credentials and ensure you have write access. Additionally, make sure
          you are trying to do commits related to programing tasks. Try again.
        </p>
      ) : (
        <p className="text-gray-600 text-sm">
          Recent activities history on your github repositories.
        </p>
      )}
      <div className="border-l-4 border-gray-300 pl-2 mt-5">
        {commitsData.map(commit => (
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
              <p className="text-gray-500">No history logs</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommitsHistory;
