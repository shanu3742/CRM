/**
 * findall user
 * only admin allow to do that
 * and also user is authanticate user and also authorized user
 */

const User = require('../models/user.models');
const { objectConverter } = require('../utils/objectConverter');

exports.findAll = async (req, res) => {
  try {
    let queryObj = {};
    /**
     * to get all aproved  user
     * we used querry params in case of optional
     */

    const userTypeQ = req.query.userType;
    if (userTypeQ) {
      queryObj.userType = userTypeQ;
    }

    /**
     * to get user best on userType
     */
    const userStatusQ = req.query.userStatus;
    if (userStatusQ) {
      queryObj.userStatus = userStatusQ;
    }
    let user = await User.find(queryObj);
    /**
     * we can't directly send user details it's has sensitive data like password
     * we have to refector our data
     */
    res.status(200).send(objectConverter(user));
  } catch (e) {
    res.status(500).send({
      message: 'internal server error',
    });
  }
};

exports.update = async (req, res) => {
  try {
    let querryId = req.params.userId;
    let user = await User.findOne({ userId: querryId });
    user.name = req.body.name !== undefined ? req.body.name : user.name;
    user.userType =
      req.body.userType !== undefined ? req.body.userType : user.userType;
    user.userStatus =
      req.body.userStatus !== undefined ? req.body.userStatus : user.userStatus;
    const updatedUser = await user.save();

    res.status(200).send({
      name: updatedUser.name,
      userId: updatedUser.userId,
      userStatus: updatedUser.userStatus,
      email: updatedUser.email,
      userType: updatedUser.userType,
    });
  } catch (e) {
    res.status(500).send({
      message: `internal server error ${e}`,
    });
  }
  /**
   * validate user is login or  not
   */
  /**
   * user is admin or its  owner
   *
   */
};
