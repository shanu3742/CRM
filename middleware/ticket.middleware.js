const User = require('../models/user.models');
const verifyedTicket = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: 'pass the ticket details',
      });
    }

    if (!req.body.title) {
      return res.status(400).send({
        message: 'tittle must be nedded',
      });
    }
    if (!req.body.description) {
      return res.status(400).send({
        message: 'description must be nedded',
      });
    }
    let userId = req.userId;
    let customer = await User.findOne({ userId: userId });
    if (customer.userStatus === 'PENDING') {
      return res.status(400).send({
        message: 'user is not approved',
      });
    }

    next();
  } catch (e) {
    res.status(500).send({
      message: `internal server error ${3}`,
    });
  }
};

module.exports = { verifyedTicket };
