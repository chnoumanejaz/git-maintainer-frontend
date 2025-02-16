export type CommitData = {
  id: number;
  repo_name: string;
  num_commits: number;
  messages: string[] | null;
  is_pushed: boolean;
  new_repo: boolean;
  created_at: string;
  user: number;
};
