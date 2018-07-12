const mongoose = require('mongoose')

module.exports = mongoose.model('User', {
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  password: String
})
