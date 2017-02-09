import Vue from 'vue';

const GITHUB_BASE_URL = 'https://api.github.com';

export function getRepo(owner, repo) {
  return Vue.http.get(`${GITHUB_BASE_URL}/repos/${owner}/${repo}`);
}
