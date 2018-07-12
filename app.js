const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/signup', require('./api/routes/signup'))
app.get('/', (req, res) => {
  res.status(200).json('Hello World!')
})

module.exports = app
