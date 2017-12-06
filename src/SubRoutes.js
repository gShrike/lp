import React from 'react'
import { Route } from 'react-router-dom'

// An example of using subroutes
// Available at /lessons/flexbox-basics/objective-0
function Routes({ match }) {
  return (
    <Route path={`${match.path}/objective-0`} component={() => <h2 className="title">Hey guys!</h2>} />
  )
}

export default Routes
