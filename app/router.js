'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/register', controller.admin.admin.register);
  router.post('/login', controller.admin.admin.login);
  router.post('/logout', controller.admin.admin.logout);
  router.post('/getAdminList', controller.admin.admin.getAdminList);
  router.post('/getAdminCount', controller.admin.admin.getAdminCount);
  router.post('/getAdminInfo', controller.admin.admin.getAdminInfo);
  router.post('/updateAvatar', controller.admin.admin.updateAvatar);
  router.post('/hongbaoHandle', controller.promotion.hongbao.hongbaoHandle);
};
