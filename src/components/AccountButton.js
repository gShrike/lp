import React from 'react'
import account from '../data/account'

function confirmLogout() {
  if (window.confirm(`This will log you out`)) {
    account.logout()
  }
}

function AccountButton(props) {
  const label = account.getUsername() || `Login with Github`
  return (
    <button className="account-button button is-dark" onClick={confirmLogout}><span className="fa fa-github"></span> {label}</button>
  )
}

export default AccountButton
