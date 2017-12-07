import React from 'react'

function onLoginButtonClick() {
  const provider = new window.firebase.auth.GithubAuthProvider()
  // provider.addScope('read:user')

  window.firebase.auth().signInWithRedirect(provider)
}

function LoginScreen() {
  return (
    <main className="login-screen hero is-dark">
      <button className="login-button button is-dark" type="button" onClick={onLoginButtonClick}><span className="fa fa-github"></span> Login with Github</button>
    </main>
  )
}

export default LoginScreen
