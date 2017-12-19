import React from 'react'

const styles = {
  label: {
    display: `block`
  }
}

class MultipleChoice extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      shuffledOptions: this.shuffle(props.options)
    }
  }

  getInputType = () => {
    switch(this.props.type) {
      case `single`:
        return `radio`
      case `multiple`:
        return `checkbox`
      default:
        return `radio`
    }
  }

  shuffle(options) {
    let array = Array.from(options)
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  render() {
    // We keep shuffledOptions on state so it does not change between renders
    const options = this.props.shuffle === false ? this.props.options : this.state.shuffledOptions

    const answer = this.props.options.length ? this.props.options[0].name : ``

    return (
      <fieldset className="section">
        <h1 className="title is-6" dangerouslySetInnerHTML={{__html:this.props.title}}></h1>
        <input type="hidden" name={`${this.props.id}-answer`} value={answer} />
        {options.map((option, i) => {
          return (
            <label key={i} style={styles.label}><input type={this.getInputType()} name={`${this.props.id}-submission`} value={option.name} /> <span dangerouslySetInnerHTML={{__html:option.name}}></span></label>
          )
        })}
      </fieldset>
    )
  }

}

MultipleChoice.defaultProps = {
  type: `single`,
  options: []
}

class MultipleChoiceReview extends React.Component {

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

MultipleChoiceReview.defaultProps = {
  options: [],
  submissions: []
}

class MultipleChoiceConfigure extends React.Component {

  convertTextareaToOptionsArray(contents) {
    const options = contents.split('\n')
    return options.map((option) => {
      return {
        name: option,
        value: option
      }
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)

    /**
     * SAMPLE:
     * { type: 'radio', options: [
         {name:'Yeah Dude!',value:'yeahdude'},
         {name:'Nah Dude!',value:'nahdude'},
       ]}
     */
    const config = {
      type: data.get('type') || 'radio',
      options: this.convertTextareaToOptionsArray(data.get('multiple-choice-options'))
    }

    this.props.onSubmit(config)
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <h3>Type</h3>
          <label><input type="radio" name="type" value="radio" /> Single Answer</label><br/>
          <label><input type="radio" name="type" value="checkbox" /> Multiple Answers</label>
        </fieldset>
        <fieldset>
          <textarea name="multiple-choice-options" cols="30" rows="6"></textarea>
        </fieldset>
        <button type="submit">Create</button>
      </form>
    )
  }

}

MultipleChoice.Review = MultipleChoiceReview
MultipleChoice.Configure = MultipleChoiceConfigure

export default MultipleChoice
