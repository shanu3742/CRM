const { isAuthenticate } = require('../middleware/auth.middleware');
const { verifyedTicket } = require('../middleware/ticket.middleware');
const ticketController = require('../controllers/ticket.controllers');

module.exports = (app) => {
  app.post(
    '/crm/api/v1/ticket',
    [isAuthenticate, verifyedTicket],
    ticketController.createTicket
  );
};
