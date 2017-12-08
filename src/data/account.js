export default {

  getToken() {
    return window.localStorage.getItem(`galvanize-lp-token`)
  },

  setToken(token) {
    window.localStorage.setItem(`galvanize-lp-token`, token)
  },

  getUsername() {
    return window.localStorage.getItem(`galvanize-lp-username`)
  },

  setUsername(username) {
    window.localStorage.setItem(`galvanize-lp-username`, username)
  },

  setData(data) {
    this.setToken(data.token)
    this.setUsername(data.username)
  }

}
