import React from 'react'
import { Link } from 'react-router-dom'
import Lessons from '../lessons/index'

function LessonList(props) {
  return (
    <div className="loading-screen hero is-dark">
      <aside className="menu">
        <h1 className="menu-label">Lessons</h1>
        <ul className="menu-list">
          {Lessons.map(lesson => {
            return (
              <li key={lesson.id}><Link to={`/lessons/${lesson.id}`}>{lesson.name}</Link></li>
            )
          })}
        </ul>
      </aside>
    </div>
  )
}

export default LessonList
