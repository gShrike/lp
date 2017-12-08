import React from 'react'

const symbols = {
  play: `play-circle-o`,
  pause: `pause-circle-o`,
  timer: `clock-o`
}

const styles = {
  input: {
    border: 0,
    fontSize: `2em`,
    width: `2.4em`,
    textAlign: `center`
  },
  button: {
    border: 0,
    fontSize: `1.4em`,
    lineHeight: `2em`,
    verticalAlign: `center`
  }
}

class Timer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isCounting: false,
      time: props.time || `3:00`
    }
  }

  getStatusIcon() {
    return `fa fa-` + (this.state.isCounting ? symbols.pause : symbols.play)
  }

  toggleStatus = (e) => {
    if (e) {
      e.preventDefault()
    }

    if (this.state.isCounting) {
      this.stopTimer()
    }
    else {
      this.startTimer()
    }

    this.setState({
      isCounting: !this.state.isCounting
    })
  }

  tick = () => {
    const time = this.refs.timer.value
    let [ m, s ] = time.split(`:`)

    // Timer has ended
    if (+m === 0 && +s === 0) {
      this.stopTimer()
      this.endTimer()
      return
    }

    // Down one minute
    if (s === `00`) {
      s = `59`
      m--
    }
    // Down one second
    else {
      s--
    }

    // Pad if necessary
    if (s.toString().length === 1) {
      s = `0${s}`
    }

    this.setState({
      time: this.refs.timer.value = `${m}:${s}`
    })
  }

  startTimer = () => {
    this.setState({
      interval: setInterval(this.tick, 1000)
    })
  }

  endTimer = () => {
    this.props.onTimerEnd()
  }

  stopTimer = () => {
    clearInterval(this.state.interval)
    this.setState({
      isCounting: false,
      interval: false
    })
  }

  render() {
    return (
      <fieldset onSubmit={this.toggleStatus}>
        <input ref="timer" readOnly={this.state.isCounting} defaultValue={this.state.time} style={styles.input} />
        <button onClick={this.toggleStatus} style={styles.button}>
          <span className={this.getStatusIcon()}></span>
        </button>
      </fieldset>
    )
  }

}

Timer.defaultProps = {
  onTimerEnd() {}
}

// No review for this component
Timer.Review = () => null

export default Timer
