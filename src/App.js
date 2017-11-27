import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LessonNav from './components/LessonNav'
import lessonData from './data/create-react-app-intro'

class App extends Component {
  render() {
    return (
      <main>
        <header className="navbar is-fixed-bottom is-dark">
          <nav className="pagination is-large" role="navigation" aria-label="pagination">
            <a className="pagination-previous" href="#start"><i className="fa fa-level-up"></i></a>
            <a className="pagination-next" href="#end"><i className="fa fa-level-down"></i></a>
          </nav>
        </header>
        <section className="min-content">
          <LessonNav lesson={lessonData} />


        </section>
        <section className="min-content">
          <LessonNav lesson={lessonData} activeIndex={0} />

        </section>

        <section className="min-content">
          <LessonNav lesson={lessonData} activeIndex={1} />

        </section>

        <section className="min-content">
          <LessonNav lesson={lessonData} activeIndex={2} />

        </section>

        <section className="min-content">
          <LessonNav lesson={lessonData} activeIndex={3} />

        </section>
        <section className="min-content">
          <LessonNav lesson={lessonData} review={true} />

        </section>
      </main>
    );
  }
}

export default App;
