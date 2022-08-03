const userControllers = require('../controllers/user.controllers');
const {
  isAuthenticate,
  isAdmin,
  isAuthorizedUser,
} = require('../middleware/auth.middleware');

module.exports = (app) => {
  app.get(
    '/crm/api/v1/users',
    [isAuthenticate, isAdmin],
    userControllers.findAll
  );
  app.put(
    '/crm/api/v1/users/:userId',
    [isAuthenticate, isAuthorizedUser],
    userControllers.update
  );
};
