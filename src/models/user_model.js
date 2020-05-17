import mongoose, { Schema } from 'mongoose';

const bcrypt = require('bcryptjs');

const saltRounds = 10;

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  username: { type: String },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

//  note use of named function rather than arrow notation
//  this arrow notation is lexically scoped and prevents binding scope, which mongoose relies on
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  const user = this;
  bcrypt.compare(candidatePassword, user.password, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

// eslint-disable-next-line consistent-return
UserSchema.pre('save', function beforeUserSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  console.log('In pre-save');
  const user = this;
  if (!user.isModified('password')) return next();

  console.log('Before hash');
  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    console.log(`hash is: ${hash}`);
    if (err) {
      next(err);
    }
    user.password = hash;
    return next();
  });
});

// create model class
const UserModel = mongoose.model('User', UserSchema);


export default UserModel;
