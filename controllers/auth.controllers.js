/**
 * this file will have the logic to signup and signin users
 */

/**
 * create a function  to allow the user to signin
 *
 * whenever a use call the endpoint :
 *
 * POST /crm/api/v1/signup, router should call the below method
 * JSON request body to be available as js object
 *
 * {
 *
 *
 * }
 */
/**
 * password must be has for that we use bcrypt
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
const authCofig = require('../configs/auth.config');

exports.signup = async (req, res) => {
  console.log('call');
  /**
   * Logic to handle the signup
   */
  /**
   * first read the request body and create the js object to be
   * inserted in the db
   */
  try {
    const userObj = {
      name: req.body.name,
      userId: req.body.userId,
      email: req.body.email,
      userType: req.body.userType,
      password: bcrypt.hashSync(req.body.password, 8),
    };
    console.log('call');

    /**
     * i need to set the user status
     */

    if (!userObj.userType || userObj.userType === 'CUSTOMER') {
      userObj.userStatus = 'APPROVED';
    } else {
      userObj.userStatus = 'PENDING';
    }
    /**
     * insert the data in the database
     */

    const savedUser = await User.create(userObj);
    /**
     * return the success  response to the customer
     */
    const postResponse = {
      name: savedUser.name,
      userId: savedUser.userId,
      email: savedUser.email,
      userType: savedUser.userType,
      userStatus: savedUser.userStatus,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.UpdateedAt,
    };

    res.status(201).send(postResponse);
  } catch (e) {
    console.log('Error while registering user', e.message);
    res.status(500).send({
      message: 'Some internal server error',
    });
  }
};

/**
 * signin controller
 */
exports.signIn = async (req, res) => {
  try {
    /**
     * read the user data  from frontend
     */
    const userId = req.body.userId;
    const password = req.body.password;

    const userData = await User.findOne({ userId: userId });
    /**
     * confirm userId
     */
    if (!userData) {
      return res.status(404).send({
        message: 'user is not exists',
      });
    }
    /**
     * confirm password
     */
    let isValidUser = bcrypt.compareSync(password, userData.password);
    /**
     * userStatus approved or login
     */
    if (!isValidUser) {
      return res.status(401).send({
        message: 'please enter valid password',
      });
    }
    if (userData.userStatus === 'PENDING') {
      return res.status(400).send({
        message: 'user is not approved',
      });
    }

    let token = jwt.sign({ id: userData.userId }, authCofig.SECRET_KEY, {
      expiresIn: 600,
    });
    let userDoc = {
      name: userData.name,
      email: userData.userId,
      userType: userData.userType,
      userStatus: userData.userStatus,
      createdAt: userData.createdAt,
      updatedAt: userData.updateedAt,
      accessToken: token,
    };

    /**
     * if user are verified
     * read all the documents
     */
    res.status(200).send(userDoc);
  } catch (e) {
    res.status(500).send({
      message: '500 Internal Error',
    });
  }
};
