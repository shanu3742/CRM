/**
 * validate user is authanticate
 */
const jwt = require('jsonwebtoken');
const key = require('../configs/auth.config');
const User = require('../models/user.models');
const isAuthenticate = (req, res, next) => {
  /**
   * check token is avaliable
   */

  const token = req.header('x-access-token');

  if (!token) {
    return res.status().send({
      message: 'please provide access token',
    });
  }
  jwt.verify(token, key.SECRET_KEY, (error, decode) => {
    if (error) {
      return res.status(401).send({
        message: `some thing went wrong while validating token${error} `,
      });
    }
    console.log(decode);
    req.userId = decode.id;
    next();
  });
  /**
   * if token is avalibale
   * validate  token
   */
};

/**
 * is user Admin
 * we have to check user type
 */

const isAdmin = async (req, res, next) => {
  try {
    // console.log(req.userId);
    let user = await User.findOne({ userId: req.userId });
    // console.log(user);
    if (user.userType !== 'ADMIN') {
      return res.status(403).send({
        message: 'you are not allow to get user details',
      });
    }
    next();
  } catch (e) {
    res.status(500).send({
      message: `internal server error ${e} `,
    });
  }
};

module.exports = { isAuthenticate, isAdmin };
