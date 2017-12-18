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
    <ol>
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
      shuffledOptions: shuffle(props.options),
      sortedOptions: shuffle(props.options.map((option, i) => {
        option.order = i
        return option
      }))
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    const sortedOptions = arrayMove(this.state.sortedOptions, oldIndex, newIndex)
    console.log(sortedOptions)
    this.setState({
      sortedOptions
    })
  }

  render() {
    // We keep shuffledOptions on state so it does not change between renders
    const options = this.props.shuffle === false ? this.props.options : this.state.shuffledOptions

    const answer = this.props.options.length ? this.props.options[0].name : ``

    return (
      <fieldset className="section">
        <h1 className="title is-6" dangerouslySetInnerHTML={{__html:this.props.title}}></h1>
        <input type="hidden" name={`${this.props.id}-answer`} value={answer} />
        <SortableList items={this.state.sortedOptions} onSortEnd={this.onSortEnd} />
      </fieldset>
    )
  }

}

Orderable.defaultProps = {
  options: []
}

class OrderableReview extends React.Component {

  render() {
    // Gather options with answers, sorted DESC
    const options = this.props.options.map((option, i) => {
      option.correct = i === 0 // First answer is correct answer
      option.answers = this.props.submissions.filter(submission => submission.answer === option.name)
      return option
    }).sort((a, b) => a.answers.length < b.answers.length)

    return (
      <fieldset className="section">
        <h1 className="title is-6" dangerouslySetInnerHTML={{__html:this.props.title}}></h1>
        {options.map((option, i) => {
          const isCorrect = option.correct ? `is-success` : `is-danger`
          return (
            <label key={i} style={styles.label}><span className={`tag is-rounded ${isCorrect}`}>{option.answers.length}</span> <span dangerouslySetInnerHTML={{__html:option.name}}></span></label>
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
