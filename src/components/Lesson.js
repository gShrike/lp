import React from 'react'
import LessonNav from './LessonNav'
import { Board, BoardReview } from './EverybodyWrites'
import LocalLessons from '../lessons/index'
import db from '../data/db'
import account from '../data/account'
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

    // We're loading from local lessons instead
    if (!lessonId) {
      const lessonUri = this.props.match.params.id
      const lessonPlan = db.createLessonPlan(LocalLessons[lessonUri], true)

      if (!lessonPlan) {
        throw new Error(`Lesson Plan "${lessonUri}" not found locally`)
      }

      this.setState({
        lessonPlan
      })

      return
    }

    const lessonPlan = await db.getLessonPlan(lessonId)

    if (!lessonPlan) {
      throw new Error(`Lesson Plan "${lessonId}" not found`)
    }

    if (account.isAdmin()) {
      db.onLessonPlanAnswerSubmission(lessonPlan, submissions => {
        this.setState({
          lessonPlan: {
            ...lessonPlan,
            submissions
          }
        })
      })
    }

    this.setState({
      lessonPlan
    })
  }

  onAnswersSubmit = async (answers) => {
    return await db.submitAnswersToLessonPlan(answers, this.state.lessonPlan.id)
  }

  getSubmissionsForStudent = () => {
    if (!this.state.lessonPlan || !this.state.lessonPlan.submissions) {
      return []
    }

    const student = account.getUsername()

    return this.state.lessonPlan.submissions.filter(submission => submission.student === student)
  }

  render() {
    if (!this.state.lessonPlan) {
      return <LoadingScreen />
    }

    const lessonMode = this.props.match.params.lessonMode || `preview`

    return (
      <div id="lesson">

        {this.state.lessonPlan.lesson.objectives.map((objective, i) => {
          return (
            <section key={objective.id} className="min-content">
              <LessonNav mode={lessonMode} lesson={this.state.lessonPlan.lesson} activeIndex={i} />
              <Board mode={lessonMode} objective={objective} onAnswersSubmit={this.onAnswersSubmit} submissions={this.state.lessonPlan.submissions} />
            </section>
          )
        })}

        <section className="min-content">
          <LessonNav lesson={this.state.lessonPlan.lesson} review={true} />
          {/* <Board objective={objective} onAnswersSubmit={this.onAnswersSubmit} submissions={this.state.lessonPlan.submissions} /> */}
          <BoardReview lesson={this.state.lessonPlan.lesson} submissions={this.getSubmissionsForStudent()} />
        </section>
      </div>
    )
  }
}

export default Lesson
