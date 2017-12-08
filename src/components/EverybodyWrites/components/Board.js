import React from 'react'
import * as Components from '../index'

class Board extends React.Component {

  onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(this.refs.form)
    const answers = []

    for (const [ cfuId, answer ] of formData.entries()) {

      // Don't include answers
      if (/-answer$/.test(cfuId)) {
        continue
      }

      answers.push({
        student: this.props.student,
        objectiveId: this.props.id,
        cfuId,
        answer,
        correct: answer === formData.get(`${cfuId}-answer`)
      })
    }

    console.log(...answers)
  }

  render() {
    return (
      <form ref="form" className="section" onSubmit={this.onSubmit}>
        {this.props.cfus.map((cfu, i) => {
          const CFU = Components[cfu.type]

          if (!CFU) {
            console.error(`Component Not Found: ${cfu.type}`)
            return null
          }

          return (
            <CFU key={i} {...cfu} {...cfu.config} />
          )
        })}
        <button className="button is-primary">Submit</button>
      </form>
    )
  }

}

Board.defaultProps = {
  cfus: []
}

export default Board
