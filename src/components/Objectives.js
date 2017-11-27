import React from 'react'
import classnames from 'classnames'

class Objectives extends React.Component {

  render() {
    const objectives = this.props.items || []
    const menuClassNames = classnames({
      'menu-list': true,
      'is-muted': this.props.activeIndex >= 0
    })

    return (
      <menu className="menu">
        <p className="menu-label">
          Objectives
        </p>
        <nav className={menuClassNames}>
          {objectives.map((obj, i) => {
            const classNames = classnames({
              'is-active': this.props.activeIndex === i || obj.active,
              'is-strikeout': i < this.props.activeIndex
            })
            return (
              <a key={obj.name} href={`#section-${i}`} dangerouslySetInnerHTML={{__html:obj.name}} className={classNames}></a>
            )
          })}
        </nav>
      </menu>
    )
  }

}

export default Objectives
