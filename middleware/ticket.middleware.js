const User = require('../models/user.models');
const TicketSchema = require('../models/ticket.model');
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

const getTicketBasedOnuserType = async (req, res, next) => {
  try {
    let userId = req.userId;
    let response;
    let user = User.findOne({ userId: userId });
    if (user.userStatus === 'PENDING') {
      return res.status(401).send({
        message: 'user is not allow to viwe ticket',
      });
    }
    let querryObj;

    if (user.userType === 'ADMIN') {
      querryObj = {};
    } else if (user.userType === 'CUSTOMER') {
      querryObj.ticketReport = req.userId;
    } else if (user.userType === 'ENGINEER') {
      querryObj.$or = [{ ticketReport: req.userId }, { assigned: req.userId }];
    }
    response = await TicketSchema.find(querryObj);
    req.ticket = response;
    next();
  } catch (e) {
    res.status(500).send({
      message: 'internal server error',
    });
  }
};
module.exports = { verifyedTicket, getTicketBasedOnuserType };
