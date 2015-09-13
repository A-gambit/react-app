import express from 'express'
import React from 'react'
import Router from 'react-router'
import routes from '../client/pages/routes'
import render from './render'

let app = express()

render(app)
app.listen(process.env.PORT || 8081)
console.log(`Server listening on http://localhost:${process.env.PORT || 8081}`)