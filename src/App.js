import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import account from './data/account'
import Lesson from './components/Lesson'
import LessonList from './components/LessonList'
import AccountButton from './components/AccountButton'
import LoadingScreen from './components/LoadingScreen'
import LoginScreen from './components/LoginScreen'
// SEED
// import lps from './lessons/index'
// import db from './data/db'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      loggedIn: null
    }
  }

  componentDidMount() {
    // Handle OAuth login redirects
    window.firebase.auth().getRedirectResult().then(result => {
      let token = account.getToken()
      let username = account.getUsername()

      // If no user found and we haven't previously logged in, show login button
      if (!result.user && (!token || !username)) {
        this.setState({
          loggedIn: false
        })
        return
      }

      // If we logged in for first time, save user information
      if (result.credential) {
        account.setData({
          token: result.credential.accessToken,
          username: result.additionalUserInfo.username
        })
      }
    }).catch(error => {
      if (error.message) {
        alert(JSON.stringify(error))
      }
    })

    // When a user logs in or out
    window.firebase.auth().onAuthStateChanged((user) => {

      this.setState({
        loggedIn: !!user,
        user,
        loading: false
      })

      // SEED lesson plans
      // db.createLessonPlan(lps['git-and-github'])

    }, (error) => {
      if (error.message) {
        alert(JSON.stringify(error))
      }
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
        <Route path="/" component={AccountButton} />
        <Route exact path="/" component={LessonList} />
        <Route exact path="/lessons/:id" component={Lesson} />
        <Route exact path="/lessons/:id/:lessonId/" component={Lesson} />
        <Route exact path="/lessons/:id/:lessonId/:lessonMode" component={Lesson} />
      </main>
    );
  }
}

export default App
