import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'



function Routes({ match }) {
  console.log(match)
  return (
    <Route path={`${match.path}/section-0`} component={() => <h2 className="title">Hey guys!</h2>} />
  )
}

export default Routes
