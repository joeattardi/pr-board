export function setUser(context, user) {
  context.commit('setUser', user);
}

export function showUserMenu(context) {
  context.commit('showUserMenu');
}

export function hideUserMenu(context) {
  context.commit('hideUserMenu');
}
