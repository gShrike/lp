import React from 'react'
import shuffle from '../helpers/shuffle'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'

const styles = {
  label: {
    display: `block`
  }
}

const SortableItem = SortableElement(({value}) =>
  <li>{value}</li>
)

const SortableList = SortableContainer(({items}) => {
  return (
    <ol className="orderable-list">
      {items.map((option, index) => (
        <SortableItem key={`item-${option.order}`} index={index} value={option.name} />
      ))}
    </ol>
  )
})

class Orderable extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      shuffledOptions: shuffle(props.options.map((option, i) => {
        option.order = ++i
        return option
      })),
      sortedOptions: null
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    const options = this.state.sortedOptions || this.state.shuffledOptions

    const sortedOptions = arrayMove(options, oldIndex, newIndex)

    this.setState({
      sortedOptions
    })
  }

  render() {
    const options = this.state.sortedOptions || this.state.shuffledOptions
    const answer = this.props.options.map((option, i) => ++i).join(`,`)
    // Don't use initial shuffle as a submission
    const submittedAnswer = (this.state.sortedOptions || []).map(option => option.order).join(`,`)

    return (
      <fieldset className="section">
        <h1 className="title is-6" dangerouslySetInnerHTML={{__html:this.props.title}}></h1>
        <input type="hidden" name={`${this.props.id}-answer`} value={answer} />
        <input type="hidden" name={`${this.props.id}-submission`} value={submittedAnswer} />
        <SortableList items={options} onSortEnd={this.onSortEnd} />
      </fieldset>
    )
  }

}

Orderable.defaultProps = {
  options: []
}

class OrderableReview extends React.Component {

  render() {
    // Gather submissions with answers
    const submissionsByAnswer = this.props.submissions.reduce((submissionsByAnswer, submission) => {
      if (!submissionsByAnswer.hasOwnProperty(submission.answer)) {
        submissionsByAnswer[submission.answer] = {
          correct: submission.correct,
          answer: submission.answer,
          answers: []
        }
      }

      submissionsByAnswer[submission.answer].answers.push(submission)

      return submissionsByAnswer
    }, {})

    // Convert to array and sort DESC
    const submissions = Object.values(submissionsByAnswer).sort((a, b) => a.answers.length < b.answers.length)

    const emptySubmissions = submissions.length ? null : <em>No submissions yet</em>

    return (
      <fieldset className="section">
        <h1 className="title is-6" dangerouslySetInnerHTML={{__html:this.props.title}}></h1>
        <ol className="orderable-list is-padded-bottom">
          {this.props.options.map(option => {
            return <li key={option.name}>{option.name}</li>
          })}
        </ol>
        {emptySubmissions}
        {submissions.map((submission, i) => {
          const isCorrect = submission.correct ? `is-success` : `is-danger`
          return (
            <label key={i} style={styles.label}><span className={`tag is-rounded ${isCorrect}`}>{submission.answers.length}</span> <span dangerouslySetInnerHTML={{__html:submission.answer}}></span></label>
          )
        })}
      </fieldset>
    )
  }

}

OrderableReview.defaultProps = {
  options: [],
  submissions: []
}

Orderable.Review = OrderableReview

export default Orderable
