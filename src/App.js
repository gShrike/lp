import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import Lesson from './components/Lesson'
import LessonList from './components/LessonList'
import AccountButton from './components/AccountButton'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      loggedIn: null,
      username: null
    }
  }

  componentDidMount() {
    // Handle OAuth login redirects
    window.firebase.auth().getRedirectResult().then(function(result) {
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

    window.firebase.auth().onAuthStateChanged((user) => {

      this.setState({
        loggedIn: !!user,
        user,
        loading: false,
        username: window.localStorage.getItem(`galvanize-lp-username`)
      })

    }, (error) => {
      alert(JSON.stringify(error))
    })
  }

  onLoginButtonClick() {
    const provider = new window.firebase.auth.GithubAuthProvider()
    // provider.addScope('read:user')

    window.firebase.auth().signInWithRedirect(provider)
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
        <Route path="/" component={() => <AccountButton username={this.state.username} />} />
        <Route exact path="/" component={LessonList} />
        <Route path="/lessons/:id/:lessonId" component={Lesson} />
      </main>
    );
  }
}

export default App
