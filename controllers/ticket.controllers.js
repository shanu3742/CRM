const User = require('../models/user.models');
const ticket = require('../models/ticket.model');
exports.createTicket = async (req, res) => {
  /**
   * validate ticket
   * ticket has  titke
   * ticket has description
   * for this we have to create token
   */
  /**
   * let's  read the title
   */

  try {
    let title = req.body.title;
    let description = req.body.description;
    let reporterId = req.userId;
    // console.log(reporterId);
    let obj = {
      title: title,
      description: description,
      reporter: req.userId,
    };

    /**
     * update ticket
     */

    let enginner = await User.findOne({ userType: 'ENGINEER' });
    // console.log(enginner);

    obj.assigned = enginner.userId;

    let ticketCreated = await ticket.create(obj);
    // console.log(ticketCreated);
    if (ticketCreated) {
      //add ticket id to reporter/customer

      const customer = await User.findOne({ userId: req.userId });

      //   console.log(customer);
      customer.ticketReport.push(ticketCreated._id);
      await customer.save();
      /**
       * update the enginner document if assigned
       */
      //   console.log(ticketCreate);
      if (enginner) {
        enginner.ticketAssigned.push(ticketCreated._id);
        await enginner.save();
      }

      //   console.log(saveUser);
      res.status(201).send(ticketCreated);
    }
  } catch (e) {
    return res.status(500).send({
      message: `something went wrong ${e}`,
    });
  }
};
