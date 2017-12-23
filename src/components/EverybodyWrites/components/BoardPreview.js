import React from 'react'

class BoardPreview extends React.Component {

  render() {
    return (
      <form ref="form" className="section">
        {this.props.cfus.map((cfu, i) => {
          return <h1 key={cfu.id} className="subtitle">{cfu.title}</h1>
        })}
      </form>
    )
  }

}

BoardPreview.defaultProps = {
  cfus: []
}

export default BoardPreview
