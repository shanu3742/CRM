const userControllers = require('../controllers/user.controllers');
const { isAuthenticate, isAdmin } = require('../middleware/auth.middleware');

module.exports = (app) => {
  app.get(
    '/crm/api/v1/users',
    [isAuthenticate, isAdmin],
    userControllers.findAll
  );
};
