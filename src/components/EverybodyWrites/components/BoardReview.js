import React from 'react'

class BoardReview extends React.Component {

  getAttemptedSubmissions() {
    return this.props.submissions.reduce((attemptedSubmissions, submission) => {
      if (!attemptedSubmissions.hasOwnProperty(submission.cfuId)) {
        attemptedSubmissions[submission.cfuId] = {
          pass: false
        }
      }

      if (submission.correct) {
        attemptedSubmissions[submission.cfuId].pass = true
      }

      return attemptedSubmissions
    }, {})
  }

  getSubmissionsForCFU(cfuId) {
    return this.props.submissions.filter(submission => submission.cfuId === cfuId)
  }

  getSubmissionsForObjective(objectiveId) {
    return this.props.submissions
  }

  render() {
    const attemptedSubmissions = this.getAttemptedSubmissions()

    const objectives = this.props.lesson.objectives.map((objective, i) => {
      return (
        <section key={objective.id}>
          <h1 className="subtitle">{objective.name}</h1>
          {objective.cfus.map(cfu => {
            let status = `unattempted`

            if (attemptedSubmissions.hasOwnProperty(cfu.id)) {
              status = attemptedSubmissions[cfu.id].pass === true ? `pass` : `fail`
            }

            const attemptIcon = {
              pass: `fa-check`,
              fail: `fa-times`,
              unattempted: `fa-ellipsis-h`
            }[status]

            return <span key={cfu.id} className={`pass-fail-icon icon is-large ${status}`}>
              <span className="fa fa-stack">
                <span className={`fa fa-stack-1x ${attemptIcon}`}></span>
                <span className="fa fa-stack-2x fa-circle-thin"></span>
              </span>
            </span>
          })}
        </section>
      )
    })

    return (
      <form ref="form" className="section">
        {objectives}
      </form>
    )
  }

}

BoardReview.defaultProps = {
  submissions: []
}

export default BoardReview
