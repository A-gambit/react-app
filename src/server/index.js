import express from 'express'
import render from './render'

let app = express()

render(app)
app.listen(process.env.PORT || 8081)
console.log(`Server listening on http://localhost:${process.env.PORT || 8081}`)