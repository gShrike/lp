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

    this.props.cfus.forEach(cfu => {
      const correctAnswer = formData.get(`${cfu.id}-answer`)
      const studentAnswer = formData.get(`${cfu.id}-submission`)

      // Skip if CFU has no correct answer or submission
      if (correctAnswer === null || studentAnswer === null || studentAnswer === ``) {
        return
      }

      const submission = {
        student: this.props.student,
        objectiveId: this.props.id,
        cfuId: cfu.id,
        answer: studentAnswer,
        correct: studentAnswer === correctAnswer
      }

      answers.push(submission)
    })

    this.setState({
      savingAnswers: true
    })

    await this.props.onAnswersSubmit(answers)

    this.setState({
      savingAnswers: false
    })
  }

  // onAnswerChange(cfuId, answer) {
  //   const answers = Object.assign({}, this.state.answers, { [cfuId]: answer })
  //   console.log(answers)
  //
  //   this.setState({
  //     answers
  //   })
  // }

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
