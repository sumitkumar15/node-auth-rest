const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .then(user => {
      if (user.length >= 1) {
        // conflict
        res.status(409).json({
          message: 'email Exists'
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err
            })
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            })
            user
              .save()
              .then(result => {
                console.log(result)
                res.status(201).json({
                  message: 'User Created'
                })
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                })
              })
          }
        })
      }
    })
}

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .then(user => {
      if (user.length < 1) {
        res.status(401).json({
          message: 'Auth failed'
        })
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            res.status(401).json({
              message: 'Auth failed'
            })
          } else {
            if (result) {
              const token = jwt.sign({
                email: user[0].email,
                _id: user[0]._id
              },
              process.env.JWT_KEY,
              {
                expiresIn: '1h'
              })
              res.status(200).json({
                message: 'Auth Success',
                token: token
              })
            } else {
              res.status(401).json({
                message: 'Auth failed'
              })
            }
          }
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.user_delete = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.userId)
  User.remove({ _id: id })
    .exec()
    .then(result => {
      if (result.n === 0) {
        throw new Error('Delete failed')
      } else {
        res.status(200).json({
          message: 'User Deleted'
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}
