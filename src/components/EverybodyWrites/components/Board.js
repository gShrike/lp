import React from 'react'
import * as Components from '../index'

class Board extends React.Component {

  render() {
    console.log('Board', this.props)
    return (
      <section className="section">
        {this.props.cfus.map((cfu, i) => {
          const CFU = Components[cfu.type]

          if (!CFU) {
            console.error(`Component Not Found: ${cfu.type}`)
            return null
          }

          return (
            <CFU key={i} title={cfu.title} {...cfu.config} />
          )
        })}
      </section>
    )
  }

}

Board.defaultProps = {
  cfus: []
}

export default Board
