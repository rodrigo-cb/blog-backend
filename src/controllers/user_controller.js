import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });


// and then the secret is usable this way:
// process.env.AUTH_SECRET;

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}


export const signin = (req, res, next) => {
  console.log('Signing in');
  res.send({ token: tokenForUser(req.user) });
};

// eslint-disable-next-line consistent-return
export const signup = (req, res, next) => {
  // 🚀 TODO:
// here you should do a mongo query to find if a user already exists with this email.
// if user exists then return an error. If not, use the User model to create a new user.
// Save the new User object
// this is similar to how you created a Post
// and then return a token same as you did in in signin
  const { email } = req.body;
  const { password } = req.body;
  const { username } = req.body;

  if (!email || !password || !username) {
    return res.status(422).send('You must provide email, password, and username');
  }
  // eslint-disable-next-line consistent-return
  User.findOne({ email }).exec((err, user) => {
    if (err) {
      res.status(500).send(`Error: ${err}`);
    }
    if (user) {
      return res.status(423).send('This email is already in use');
    } else {
      const newUser = new User();
      newUser.email = email;
      newUser.password = password;
      newUser.username = username;
      newUser.save()
        .then((result) => {
          res.send({ token: tokenForUser(newUser) });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send(`Error: ${error}`);
        });
    }
  });
};
