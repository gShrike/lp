import React from 'react'
import { BoardPreview, BoardQuiz, BoardResults } from '../index'
import account from '../../../data/account'

class Board extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  getSubmissionsForObjective = (objectiveId) => {
    if (!this.props.submissions.length) {
      return []
    }

    return this.props.submissions.filter(submission => submission.objectiveId === objectiveId)
  }

  renderBoard = (mode) => {
    if (mode === `preview`) {
      return <BoardPreview {...this.props.objective} />
    }

    if (mode === `quiz`) {
      return <BoardQuiz {...this.props.objective} student={account.getUsername()} onAnswersSubmit={this.props.onAnswersSubmit} />
    }

    if (mode === `results`) {
      return <BoardResults {...this.props.objective} submissions={this.props.submissions} />
    }

    return null
  }

  render() {
    return (
      <div className="section">
        {this.renderBoard(this.props.mode)}
      </div>
    )
  }

}

Board.defaultProps = {
  mode: `preview`,
  objective: {},
  submissions: []
}

export default Board
