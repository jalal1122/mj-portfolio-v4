import { site } from "@/lib/site-content";

export interface GitHubMetrics {
  contributions: string;
  contributionLabel: string;
  repositories: string;
  repositoriesLabel: string;
  totalCommits: number;
  openSourceRepos: number;
  totalStars: number;
  weeklyContributions: number[];
  source: "live" | "fallback";
}

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

// We use GraphQL to fetch everything in a single, highly-efficient network request.
const githubQuery = `
  query GitHubMetrics($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC, isFork: false, orderBy: {field: STARGAZERS, direction: DESC}) {
        totalCount
        nodes {
          stargazerCount
        }
      }
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
            }
          }
        }
      }
    }
  }
`;

function buildFallbackMetrics(): GitHubMetrics {
  return {
    contributions: site.githubImpact.contributions,
    contributionLabel: site.githubImpact.contributionLabel,
    repositories: site.githubImpact.repositories,
    repositoriesLabel: site.githubImpact.repositoriesLabel,
    totalCommits: 2847,
    openSourceRepos: 12,
    totalStars: 348,
    weeklyContributions: [3, 5, 2, 8, 4, 6, 1, 7, 3, 9, 4, 2, 6, 5],
    source: "fallback",
  };
}

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export async function getGitHubMetrics(): Promise<GitHubMetrics> {
  const login = process.env.GITHUB_USERNAME?.trim();
  const token = process.env.GITHUB_TOKEN?.trim();

  if (!login || !token) {
    return buildFallbackMetrics();
  }

  // Calculate the current year to fetch contributions from Jan 1st to today
  const now = new Date();
  const from = new Date(now.getFullYear(), 0, 1).toISOString();
  const to = now.toISOString();

  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: githubQuery,
        variables: { login, from, to },
      }),
      // Using no-store is perfect for Next.js if you want this to always be fresh on your portfolio
      cache: "no-store",
    });

    if (!response.ok) {
      return buildFallbackMetrics();
    }

    const { data } = await response.json();

    if (!data || !data.user) {
      return buildFallbackMetrics();
    }

    const user = data.user;

    // 1. Calculate Repositories & Stars
    const openSourceRepos = user.repositories.totalCount;
    const repos = user.repositories.nodes;
    const totalStars = repos.reduce(
      (sum: number, repo: { stargazerCount: number }) =>
        sum + repo.stargazerCount,
      0,
    );

    // 2. Calculate Contributions & Commits
    const contributions = user.contributionsCollection;
    const totalContributions =
      contributions.contributionCalendar.totalContributions;
    const totalCommits = contributions.totalCommitContributions;

    // 3. Flatten the contribution calendar to get the recent days for your chart/buckets
    const allDays = contributions.contributionCalendar.weeks.flatMap(
      (week: any) =>
        week.contributionDays.map((day: any) => day.contributionCount),
    );

    // Grab the last 14 days of contribution activity
    const recentContributions = allDays.slice(-14);

    return {
      contributions: formatCount(totalContributions),
      contributionLabel: site.githubImpact.contributionLabel,
      repositories: formatCount(openSourceRepos),
      repositoriesLabel: site.githubImpact.repositoriesLabel,
      totalCommits,
      openSourceRepos,
      totalStars,
      weeklyContributions:
        recentContributions.length > 0
          ? recentContributions
          : buildFallbackMetrics().weeklyContributions,
      source: "live",
    };
  } catch (error) {
    console.error("GitHub Metrics Fetch Failed:", error);
    return buildFallbackMetrics();
  }
}
