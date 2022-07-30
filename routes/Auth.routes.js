/**
 * this will have the logic to route the request  to different controllers
 */
const authController = require('../controllers/auth.controllers');

module.exports = (app) => {
  /**
   * Define the route for sign up
   *
   * POST /crm/api/v1/signup  -> auth controller sign up method
   *
   */

  app.post('/crm/api/v1/auth/signup', authController.signup);
};
