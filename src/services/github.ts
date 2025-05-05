
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
});

// You can replace these with your own GitHub username and repository
const username = "rocketseat-education";
const repo = "reactjs-github-blog-challenge";

export interface UserData {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  company: string;
  bio: string;
  followers: number;
  html_url: string;
}

export interface Issue {
  id: number;
  title: string;
  body: string;
  number: number;
  created_at: string;
  comments: number;
  user: {
    login: string;
  };
  html_url: string;
}

export interface SearchIssuesResponse {
  total_count: number;
  items: Issue[];
}

export async function fetchUser(user: string = username): Promise<UserData> {
  const response = await api.get<UserData>(`/users/${user}`);
  return response.data;
}

export async function fetchIssues(query: string = ""): Promise<SearchIssuesResponse> {
  const searchQuery = query
    ? `${query} repo:${username}/${repo}`
    : `repo:${username}/${repo}`;

  const response = await api.get<SearchIssuesResponse>("/search/issues", {
    params: {
      q: searchQuery,
    },
  });
  
  return response.data;
}

export async function fetchIssueDetails(issueNumber: number): Promise<Issue> {
  const response = await api.get<Issue>(`/repos/${username}/${repo}/issues/${issueNumber}`);
  return response.data;
}
