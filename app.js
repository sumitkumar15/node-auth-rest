const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://new_user_11:' +
  process.env.MONGO_PASSWORD +
  '@testapp-shard-00-00-nompv.mongodb.net:27017,testapp-shard-00-01-nompv.mongodb.net:27017,testapp-shard-00-02-nompv.mongodb.net:27017/test?ssl=true&replicaSet=testapp-shard-0&authSource=admin&retryWrites=true'
)
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/user', require('./api/routes/user'))
app.get('/', (req, res) => {
  res.status(200).json('Hello World!')
})

module.exports = app
