const LP_TOKEN = `lp-token`
const LP_USERNAME = `lp-username`

export default {

  getToken() {
    return window.localStorage.getItem(LP_TOKEN)
  },

  setToken(token) {
    window.localStorage.setItem(LP_TOKEN, token)
  },

  getUsername() {
    return window.localStorage.getItem(LP_USERNAME)
  },

  setUsername(username) {
    window.localStorage.setItem(LP_USERNAME, username)
  },

  setData(data) {
    this.setToken(data.token)
    this.setUsername(data.username)
  },

  logout() {
    window.firebase.auth().signOut().then(() => {
      window.localStorage.removeItem(LP_TOKEN)
      window.localStorage.removeItem(LP_USERNAME)
    }).catch(error => {
      if (error.message) {
        alert(JSON.stringify(error))
      }
    })
  },

  isAdmin() {
    return true
  }

}
