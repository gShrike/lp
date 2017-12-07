import React from 'react'
import LessonNav from './LessonNav'
import { Board } from './EverybodyWrites'
import db from '../data/db'
import LoadingScreen from './LoadingScreen'

class Lesson extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      lessonPlan: null
    }
  }

  async componentDidMount() {
    const lessonId = this.props.match.params.lessonId
    const lessonPlan = await db.getLessonPlan(lessonId)

    if (!lessonPlan) {
      throw new Error(`Lesson Plan "${lessonId}" not found`)
    }

    this.setState({
      lessonPlan
    })
  }

  render() {
    if (!this.state.lessonPlan) {
      return <LoadingScreen />
    }

    return (
      <div>
        {/* <header className="navbar is-fixed-bottom is-dark">
          <nav className="pagination is-large" aria-label="pagination">
            <a className="pagination-previous" href="#start"><i className="fa fa-level-up"></i></a>
            <a className="pagination-next" href="#end"><i className="fa fa-level-down"></i></a>
          </nav>
        </header> */}
        {this.state.lessonPlan.lesson.objectives.map((objective, i) => {
          return (
            <section key={i} className="min-content">
              <LessonNav lesson={this.state.lessonPlan.lesson} activeIndex={i} />
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
          <LessonNav lesson={this.state.lessonPlan.lesson} review={true} />

        </section>
      </div>
    )
  }
}

export default Lesson
