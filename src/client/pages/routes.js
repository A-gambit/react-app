import {Route, DefaultRoute, NotFoundRoute} from "react-router"
import React from "react"
import About from './about'
import Index from './index'
import App from './app'

export default (
  <Route handler={App}>
    <Route name='about' handler={About} />
    <DefaultRoute name='index'handler={Index} />
  </Route>
)