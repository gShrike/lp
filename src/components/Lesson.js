import React from 'react'
import LessonNav from './LessonNav'
import { Board, BoardResults } from './EverybodyWrites'
import db from '../data/db'
import account from '../data/account'
import LoadingScreen from './LoadingScreen'

class Lesson extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      lessonPlan: null,
      resultsView: false
    }
  }

  async componentDidMount() {
    const lessonId = this.props.match.params.lessonId
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

  getSubmissionsForObjective = (objectiveId) => {
    if (!this.state.lessonPlan || !this.state.lessonPlan.submissions) {
      return []
    }

    return this.state.lessonPlan.submissions.filter(submission => submission.objectiveId === objectiveId)
  }

  renderBoard = (objective, objectiveSubmissions = []) => {
    if (this.state.resultsView) {
      return <BoardResults {...objective} submissions={objectiveSubmissions} />
    }

    return <Board {...objective} student={account.getUsername()} onAnswersSubmit={this.onAnswersSubmit} />
  }

  toggleBoardResults = () => {
    this.setState({
      resultsView: !this.state.resultsView
    })
  }

  renderToggleResultsButton(objective, objectiveSubmissions = []) {
    if (account.isAdmin() && objectiveSubmissions.length) {
      return (
        <div className="buttons is-centered is-padded is-marginless">
          <button onClick={this.toggleBoardResults} className="button is-info is-outlined"><span className="fa fa-pie-chart"></span> Toggle Results</button>
        </div>
      )
    }

    return null
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
          const objectiveSubmissions = this.getSubmissionsForObjective(objective.id)

          return (
            <section key={objective.id} className="min-content">
              <LessonNav lesson={this.state.lessonPlan.lesson} activeIndex={i} />
              {this.renderToggleResultsButton(objective, objectiveSubmissions)}
              {this.renderBoard(objective, objectiveSubmissions)}
            </section>
          )
        })}

        <section className="min-content">
          <LessonNav lesson={this.state.lessonPlan.lesson} review={true} />
          {/* Future result information */}
        </section>
      </div>
    )
  }
}

export default Lesson
