import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import SubRoutes from './SubRoutes'


function Routes() {
  return (
    <Router>
      <div>
        <Route path="/app" component={SubRoutes} />
        <Route path="/app" component={App} />

      </div>
    </Router>
  )
}

export default Routes
