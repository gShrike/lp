import React from 'react'
import { Route } from 'react-router-dom'

function Routes({ match }) {
  return (
    <Route path={`${match.path}/section-0`} component={() => <h2 className="title">Hey guys!</h2>} />
  )
}

export default Routes
