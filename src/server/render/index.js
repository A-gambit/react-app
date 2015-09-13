import express from 'express'
import React from 'react'
import Router from 'react-router'
import routes from '../../client/pages/routes'


export default (app) => {
  app.get('/', (req, res) => {
    Router.run(routes, Handler => {
      let bodyContent = React.renderToString(<Handler />)
      let staticContent = React.renderToStaticMarkup(
        <html>
        <head>
          <title>React App</title>
          <link rel='stylesheet' href='/assets/style.css' />
          <script src="/assets/client.js" defer />
        </head>
        <body dangerouslySetInnerHTML={{__html: bodyContent}}>
        </body>
        </html>
      )
      res.setHeader('Content-Type', 'text/html')
      res.end(staticContent)
    })
  })
  app.use('/assets', express.static('./dist/assets'))
}