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
const User = require('../models/user.models');

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
    console.log('Error while registering user', err.message);
    res.status(500).send({
      message: 'Some internal server error',
    });
  }
};
