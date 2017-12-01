import React, { Component } from 'react';
import './App.css';
import LessonNav from './components/LessonNav'
import lessonData from './data/create-react-app-intro'
import { Route } from 'react-router-dom'

import { Board, Timer, MultipleChoice } from './components/EverybodyWrites'

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
