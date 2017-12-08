import React from 'react'
import * as Components from '../index'

class Board extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      savingAnswers: false
    }
  }

  onSubmit = async (e) => {
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

    this.setState({
      savingAnswers: true
    })

    await this.props.onAnswersSubmit(answers)

    this.setState({
      savingAnswers: false
    })
  }

  render() {
    const isSavingAnswers = this.state.savingAnswers ? `is-loading` : ``

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
        {this.props.cfus.length ? <button className={`button is-success is-outlined ${isSavingAnswers}`}>Submit</button> : null}
      </form>
    )
  }

}

Board.defaultProps = {
  cfus: [],
  onAnswerSubmit() {}
}

export default Board
