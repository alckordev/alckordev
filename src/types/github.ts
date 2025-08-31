export type GitHubRepository = {
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  languages: {
    edges: Array<{
      node: {
        name: string;
        color: string;
      };
    }>;
  };
};

export type GitHubResponse = {
  data: {
    user: {
      pinnedItems: {
        edges: Array<{
          node: GitHubRepository;
        }>;
      };
    };
  };
};
