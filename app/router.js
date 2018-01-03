'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/register', controller.admin.admin.register);
  router.post('/login', controller.admin.admin.login);
  router.post('/logout', controller.admin.admin.logout);
  router.post('/getAdminList', controller.admin.admin.getAdminList);
};
