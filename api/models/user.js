const mongoose = require('mongoose')

module.exports = mongoose.model('User', {
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true },
  password: { type: String, required: true }
})
