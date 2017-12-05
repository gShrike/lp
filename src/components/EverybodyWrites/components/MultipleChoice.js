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
      configured: !!props.options || false
    }
  }

  setConfig(config) {
    console.log(config)
    this.setState({

    })
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

  render() {
    if (!this.state.configured) {
      return <MultipleChoiceConfigure onSubmit={this.setConfig} />
    }

    return (
      <form className="section">
        <h1 className="title is-6" dangerouslySetInnerHTML={{__html:this.props.title}}></h1>
        {this.props.options.map((option, i) => {
          return (
            <label key={i} style={styles.label}><input type={this.getInputType()} name="value" value={option.value} /> <span dangerouslySetInnerHTML={{__html:option.name}}></span></label>
          )
        })}
      </form>
    )
  }

}

MultipleChoice.defaultProps = {
  type: `radio`,
  options: []
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

MultipleChoice.Configure = MultipleChoiceConfigure

export default MultipleChoice
