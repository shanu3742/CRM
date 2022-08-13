const { isAuthenticate } = require('../middleware/auth.middleware');
const {
  verifyedTicket,
  getTicketBasedOnuserType,
} = require('../middleware/ticket.middleware');
const ticketController = require('../controllers/ticket.controllers');

module.exports = (app) => {
  app.post(
    '/crm/api/v1/ticket',
    [isAuthenticate, verifyedTicket],
    ticketController.createTicket
  );
};
module.exports = (app) => {
  app.get(
    '/crm/api/v1/ticket',
    [isAuthenticate, getTicketBasedOnuserType],
    ticketController.getTicket
  );
};
