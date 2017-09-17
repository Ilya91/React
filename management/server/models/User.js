import mongoose from "mongoose"
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function
UserSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}
// Create the model class
//module.exports = mongoose.model('User', UserSchema);

// Export the model
//module.exports = ModelClass;
//mongoose.model('User', UserSchema);

var User;

if (mongoose.models.User) {
    User = mongoose.model('User');
} else {
    User = mongoose.model('User', UserSchema);
}

module.exports = User;