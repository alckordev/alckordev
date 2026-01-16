import { GitHubRepository, GitHubResponse } from "@/types/github";

const GITHUB_GRAPHQL_QUERY = `
  query GetPinnedRepos($login: String!, $limit: Int!) {
    user(login: $login) {
      pinnedItems(first: $limit, types: REPOSITORY) {
        edges {
          node {
            ... on Repository {
              name
              description
              url
              homepageUrl
              stargazerCount
              forkCount
              updatedAt,
              languages(first: 3) {
                edges {
                  node {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getGitHubRepositories(): Promise<GitHubRepository[]> {
  try {
    const response = await fetch(process.env.GITHUB_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: GITHUB_GRAPHQL_QUERY,
        variables: {
          login: process.env.GITHUB_LOGIN,
          limit: parseInt(process.env.GITHUB_LIMIT || "10"),
        },
      }),
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: ["github-repos"], // Tag for manual revalidation
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const { data, errors } = await response.json();

    if (errors) throw new Error(errors);

    return (data as GitHubResponse["data"]).user.pinnedItems.edges.map(
      (e) => e.node,
    );
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    return [];
  }
}
