import React from 'react'
import * as Components from '../index'

class Board extends React.Component {

  onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(this.refs.form)
    const answers = []

    for (const cfu of formData.entries()) {
       console.log(cfu[0]+ ', '+ cfu[1]);
       answers.push({
         student: this.props.student,
         cfuId: cfu[0],
         answer: cfu[1]
       })
    }

    console.log(answers)
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
            <CFU key={i} id={cfu.id} title={cfu.title} {...cfu.config} />
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
