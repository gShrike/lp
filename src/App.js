import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import Lesson from './components/Lesson'
import LessonList from './components/LessonList'
import AccountButton from './components/AccountButton'
import LoadingScreen from './components/LoadingScreen'
import LoginScreen from './components/LoginScreen'

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

    // When a user logs in or out
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

  render() {
    // Loading Screen
    if (this.state.loading) {
      return <LoadingScreen />
    }

    // Login Screen
    if (!this.state.loggedIn) {
      return <LoginScreen />
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
