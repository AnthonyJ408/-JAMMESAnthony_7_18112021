const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const { roleJwt } = require('../middleware');
const messageCtrl = require('../controllers/message');
const { body } = require('express-validator');

router.get('/', [roleJwt.verifyToken], messageCtrl.getAllMessage);
router.get('/:id', [roleJwt.verifyToken], messageCtrl.getOneMessage);
router.put(
  '/:id',
  [roleJwt.verifyToken || roleJwt.isAdmin],
  multer,
  messageCtrl.modifyMessage
);
router.post(
  '/',
  body()
    .isJSON()
    .withMessage('Requête avec données non acceptées!'),

  [roleJwt.verifyToken],
  multer,
  messageCtrl.createMessage
);
router.post(
  '/:id',
  [roleJwt.verifyToken || roleJwt.isAdmin],
  messageCtrl.deleteMessage
);

module.exports = router;
