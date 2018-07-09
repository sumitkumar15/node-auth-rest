const mongoose = require('mongoose')

const User = mongoose.model('User', {
  email: String,
  userid: String,
  password: String
})

module.exports = {
  User
}
