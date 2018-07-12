const express = require('express')
const app = express()

app.use('/signup', require('./routes/signup'))
app.get('/', (req, res) => {
  res.status(200).json('Hello World!')
})

module.exports = app
