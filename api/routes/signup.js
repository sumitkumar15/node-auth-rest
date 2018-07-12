var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
const db = require('../db/db')

function generateRandomId () {
  return Math.random().toString(36).replace('/[^a-z]+/g/', '').substr(0, 8)
}

router.post('/email', bodyParser.urlencoded({extended: false}), (req, res) => {
  const userid = generateRandomId()
  const body = Object.assign({userid: userid}, req.body)
  try {
    db.createUser(body).then((err, doc) => {
      if (err) throw err
      else {
        res.send({
          status: 'success',
          userid: userid
        })
      }
    })
  } catch (error) {
    console.log(error)
    res.send({status: 'failed'})
  }
})

module.exports = router
