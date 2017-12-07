import React from 'react'

function logout() {
  window.firebase.auth().signOut().then(function() {
    window.localStorage.removeItem(`galvanize-lp-token`)
    window.localStorage.removeItem(`galvanize-lp-username`)
  }).catch(function(error) {
    alert(JSON.stringify(error))
  })
}

function confirmLogout() {
  if (window.confirm(`This will log you out`)) {
    logout()
  }
}

function AccountButton(props) {
  const label = props.username || `Login with Github`
  return (
    <button className="account-button button is-dark" onClick={confirmLogout}><span className="fa fa-github"></span> {label}</button>
  )
}

export default AccountButton
