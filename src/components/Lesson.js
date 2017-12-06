import React from 'react'
import Lessons from '../lessons/index'
import LessonNav from './LessonNav'
import { Board } from './EverybodyWrites'

class Lesson extends React.Component {

  constructor(props) {
    super(props)

    const lessonId = props.match.params.id

    this.state = {
      lesson: Lessons.find(lesson => lesson.id === lessonId)
    }

    if (!this.state.lesson) {
      throw new Error(`Lesson ${lessonId} not found`)
    }
  }


  render() {
    return (
      <div>
        {/* <header className="navbar is-fixed-bottom is-dark">
          <nav className="pagination is-large" aria-label="pagination">
            <a className="pagination-previous" href="#start"><i className="fa fa-level-up"></i></a>
            <a className="pagination-next" href="#end"><i className="fa fa-level-down"></i></a>
          </nav>
        </header> */}
        {this.state.lesson.objectives.map((objective, i) => {
          return (
            <section key={i} className="min-content">
              <LessonNav lesson={this.state.lesson} activeIndex={i} />
              <Board {...objective} />
            </section>
          )
        })}
        {/* <section className="min-content">
          <LessonNav lesson={this.state.lesson} />

          <Timer time=":05" onTimerEnd={() => alert(`TIMES UP SUCKERS!`)} />
          <MultipleChoice type="multiple" options={[
             {name:'Yeah Dude!',value:'yeahdude'},
             {name:'Nah Dude!',value:'nahdude'},
           ]} />
        </section> */}

        <section className="min-content">
          <LessonNav lesson={this.state.lesson} review={true} />

        </section>
      </div>
    )
  }
}

export default Lesson
