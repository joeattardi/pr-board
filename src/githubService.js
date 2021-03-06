import Vue from 'vue';

import store from './store/index';

const GITHUB_BASE_URL = 'https://api.github.com';

export function apiRequest(url) {
  return Vue.http.get(url, {
    headers: {
      Authorization: `token ${store.state.accessToken}`
    }
  });
}

export function getRepo(owner, repo) {
  return apiRequest(`${GITHUB_BASE_URL}/repos/${owner}/${repo}`);
}

export function getPullRequests(owner, repo) {
  return apiRequest(`${GITHUB_BASE_URL}/repos/${owner}/${repo}/pulls`);
}

export function getPullRequestDetails(fullRepoPath, pullRequestId) {
  return apiRequest(`${GITHUB_BASE_URL}/repos/${fullRepoPath}/pulls/${pullRequestId}`);
}
