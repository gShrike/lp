/* globals firebase, firebaseui */
import React, { Component } from 'react';
import './App.css';
import LessonNav from './components/LessonNav'
import lessonData from './data/create-react-app-intro'
// import { Route } from 'react-router-dom'

import { Board, Timer, MultipleChoice } from './components/EverybodyWrites'

class App extends Component {
  componentDidMount() {
    window.firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
    })

    // FirebaseUI config.
    var uiConfig = {
      signInSuccessUrl: '/app',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>'
    };

    firebase.auth().onAuthStateChanged((user) => {

      if (!user) {
        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig)
        ////////////////////////////////////////////////
        return
      }
      console.log({ user })
      if (user) {
        this.setState({ user })
        // User is signed in.
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var uid = user.uid;
        // var phoneNumber = user.phoneNumber;
        // var providerData = user.providerData;
        user.getIdToken().then(function(accessToken) {
          // document.getElementById('sign-in-status').textContent = 'Signed in';
          // document.getElementById('sign-in').textContent = 'Sign out';
          // document.getElementById('account-details').textContent = JSON.stringify({
          //   displayName: displayName,
          //   email: email,
          //   emailVerified: emailVerified,
          //   phoneNumber: phoneNumber,
          //   photoURL: photoURL,
          //   uid: uid,
          //   accessToken: accessToken,
          //   providerData: providerData
          // }, null, '  ');
        });
      } else {
        // User is signed out.
        // document.getElementById('sign-in-status').textContent = 'Signed out';
        // document.getElementById('sign-in').textContent = 'Sign in';
        // document.getElementById('account-details').textContent = 'null';
      }
    }, function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <main>
        <header className="navbar is-fixed-bottom is-dark">
          <nav className="pagination is-large" aria-label="pagination">
            <a className="pagination-previous" href="#start"><i className="fa fa-level-up"></i></a>
            <a className="pagination-next" href="#end"><i className="fa fa-level-down"></i></a>
          </nav>
        </header>
        {lessonData.objectives.map((objective, i) => {
          return (
            <section key={i} className="min-content">
              <LessonNav lesson={lessonData} activeIndex={i} />
              <Board {...objective} />
            </section>
          )
        })}
        <section className="min-content">
          <LessonNav lesson={lessonData} />

          <Timer time=":05" onTimerEnd={() => alert(`TIMES UP SUCKERS!`)} />
          <MultipleChoice type="multiple" options={[
             {name:'Yeah Dude!',value:'yeahdude'},
             {name:'Nah Dude!',value:'nahdude'},
           ]} />
        </section>

        <section className="min-content">
          <LessonNav lesson={lessonData} review={true} />

        </section>
      </main>
    );
  }
}

export default App;
