const mongoose = require('mongoose')
const { User } = require('./models')

mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log('connected')
})

// const kitty = new Cat({ name: 'Zildjian' })
function createUser (userdata) {
  User.findOne({email: userdata.email}, (err, doc) => {
    if (err) throw err
    else {
      let user = new User(userdata)
      return user.save().then()
      // .then((err, desc) => {
      //   if (err) throw err
      //   else return desc
      // })
    }
  })
}

module.exports = {
  createUser
}
