/* globals firebase */
import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import Lesson from './components/Lesson'
import LessonList from './components/LessonList'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      loggedIn: null
    }
  }

  componentDidMount() {
    window.firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
    })

    // Handle OAuth login redirects
    firebase.auth().getRedirectResult().then(function(result) {
      let token = window.localStorage.getItem(`galvanize-lp-token`)
      let username = window.localStorage.getItem(`galvanize-lp-username`)

      // If no user found and we haven't previously logged in, show login button
      if (!result.user && (!token || !username)) {
        this.setState({
          loggedIn: false
        })
        return
      }

      // If we logged in for first time, save user information
      if (result.credential) {
        window.localStorage.setItem(`galvanize-lp-token`, result.credential.accessToken)
        window.localStorage.setItem(`galvanize-lp-username`, username = result.additionalUserInfo.username)
      }
    }).catch(error => {
      alert(JSON.stringify(error))
    })

    firebase.auth().onAuthStateChanged((user) => {

      this.setState({
        loggedIn: !!user,
        user,
        loading: false
      })

    }, (error) => {
      alert(JSON.stringify(error))
    })
  }

  onLoginButtonClick() {
    const provider = new firebase.auth.GithubAuthProvider()
    // provider.addScope('read:user')

    firebase.auth().signInWithRedirect(provider)
  }

  render() {
    // Loading Screen
    if (this.state.loading) {
      return <main className="loading-screen hero is-dark">
        <span className="fa fa-fw fa-snowflake-o fa-1x"></span>
      </main>
    }

    // Login Screen
    if (!this.state.loggedIn) {
      return <main className="login-screen hero is-dark">
        <button className="login-button button is-dark" type="button" onClick={this.onLoginButtonClick}><span className="fa fa-github"></span> Login with Github</button>
      </main>
    }

    // Board
    return (
      <main>
        <Route exact path="/" component={LessonList} />
        <Route path="/lessons/:id" component={Lesson} />
      </main>
    );
  }
}

export default App
