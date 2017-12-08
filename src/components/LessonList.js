import React from 'react'
import { Link } from 'react-router-dom'
import db from '../data/db'

class LessonList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      lessonPlans: []
    }
  }

  async componentDidMount() {
    this.setState({
      lessonPlans: await db.getLessonPlans()
    })
  }

  render() {
    const { lessonPlans } = this.state

    return (
      <div className="loading-screen hero is-dark">
        <aside className="menu">
          <h1 className="menu-label">Lessons</h1>
          <ul className="menu-list">
            {lessonPlans.map(lessonPlan => {
              return (
                <li key={lessonPlan.id}><Link to={`/lessons/${lessonPlan.lesson.uri}/${lessonPlan.id}`}>{lessonPlan.lesson.name}</Link></li>
              )
            })}
          </ul>
        </aside>
      </div>
    )
  }

}

export default LessonList
