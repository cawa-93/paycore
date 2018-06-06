export const state = {
  authorizationToken: null,
  members: null
}

export const getters = {
  isUserAuth (state) {
    return !!(state.authorizationToken &&
    state.authorizationToken.token &&
    new Date(state.authorizationToken.expiresAt) > Date.now())
  }
}

export const mutations = {
  initUser (state, authData) {
    state.authorizationToken = authData.authorizationToken
    state.members = authData.members
  }
}
