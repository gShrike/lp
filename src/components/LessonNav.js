import React from 'react'
import Objectives from './Objectives'

class LessonNav extends React.Component {

  getLessonTitle = () => {
    const { lesson, activeIndex, review } = this.props

    if (review) {
      return [
        <h1 key="0" className="subtitle">Review</h1>,
        <h2 key="1" className="title" dangerouslySetInnerHTML={{__html:lesson.name}}></h2>,
      ]
    }

    if (activeIndex >= 0) {
      return [
        <h1 key="0" className="subtitle" dangerouslySetInnerHTML={{__html:lesson.name}}></h1>,
        <h2 key="1" className="title" dangerouslySetInnerHTML={{__html:lesson.objectives[activeIndex].name}}></h2>,
      ]
    }

    return (
      <h1 className="title" dangerouslySetInnerHTML={{__html:lesson.name}}></h1>
    )
  }

  getPageAnchor() {
    const { lesson, activeIndex, review } = this.props

    if (review) {
      return `end`
    }

    if (activeIndex >= 0) {
      return `section-${activeIndex}`
    }

    return `start`
  }

  render() {
    const { lesson, activeIndex } = this.props
    return (
      <section id={this.getPageAnchor()} className="hero is-dark">
        <div className="hero-body">
          {this.getLessonTitle()}
          <Objectives items={lesson.objectives} activeIndex={activeIndex} />
        </div>
      </section>
    )
  }

}

export default LessonNav
