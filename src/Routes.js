import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import SubRoutes from './SubRoutes'

function Routes() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="superfluous-routes-div">
        <Route path="/lessons/:id" component={SubRoutes} />
        <Route path="/" component={App} />
      </div>
    </Router>
  )
}

export default Routes
