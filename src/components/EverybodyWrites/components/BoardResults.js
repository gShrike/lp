import React from 'react'
import * as Components from '../index'

class BoardResults extends React.Component {

  getSubmissionsForCFU(cfuId) {
    return this.props.submissions.filter(submission => submission.cfuId === cfuId)
  }

  render() {
    return (
      <form ref="form" className="section">
        {this.props.cfus.map((cfu, i) => {
          const CFU = Components[cfu.type]

          if (!CFU) {
            console.error(`Component Not Found: ${cfu.type}`)
            return null
          }
          if (!CFU.Review) {
            console.error(`Component Not Found: ${cfu.type}.Review`)
            return null
          }

          return (
            <CFU.Review key={i} submissions={this.getSubmissionsForCFU(cfu.id)} {...cfu} {...cfu.config} />
          )
        })}
      </form>
    )
  }

}

BoardResults.defaultProps = {
  cfus: [],
  submissions: []
}

export default BoardResults
