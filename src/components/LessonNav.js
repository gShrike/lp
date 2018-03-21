import React from 'react'
import Objectives from './Objectives'
import { Link } from 'react-router-dom'

const tabs = [
  { name: `Preview`, uri: `preview` },
  { name: `Start Quiz`, uri: `quiz` },
  { name: `Results`, uri: `results`, icon: `fa-pie-chart` }
]

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
    const { activeIndex, review } = this.props

    if (review) {
      return `end`
    }

    if (activeIndex >= 0) {
      return `section-${activeIndex}`
    }

    return `start`
  }

  getTabs() {
    return this.props.tabs.map(tab => {
      const activeTab = tab.uri === this.props.mode ? `is-active` : ``

      return <li key={tab.uri} className={activeTab}>
        <Link to={`./${tab.uri}`}>
          <span className={`fa ${tab.icon}`}></span>
          {tab.name}
        </Link>
      </li>
    })
  }

  render() {
    const { lesson, activeIndex } = this.props
    const hiddenFooter = this.props.review ? `is-hidden` : ``

    return (
      <section id={this.getPageAnchor()} className="hero is-dark">
        <div className="hero-head">
          <div className="tabs is-fullwidth">
            <ul>
              <li>
                <Link to="/">
                  <span className="icon"><i className="fa fa-angle-left"></i></span>
                  <span>Lessons</span>
                </Link>
              </li>
              {/* <li>
                <a href="/">
                  <span className="icon"><i className="fa fa-angle-up"></i></span>
                  <span>Lessons</span>
                </a>
              </li> */}
              {/* <li>
                <a>
                  <span>Right</span>
                  <span className="icon"><i className="fa fa-angle-right"></i></span>
                </a>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="hero-body">
          {this.getLessonTitle()}
          <Objectives items={lesson.objectives} activeIndex={activeIndex} />
        </div>
        <div className={`hero-foot ${hiddenFooter}`}>
          <nav className="tabs is-fullwidth">
            <ul>
              {this.getTabs()}
            </ul>
          </nav>
        </div>
      </section>
    )
  }

}

LessonNav.defaultProps = {
  onToggleResults() {},
  tabs
}

export default LessonNav
