const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const { roleJwt } = require('../middleware');
const messageCtrl = require('../controllers/message');
router.get('/', [roleJwt.verifyToken], messageCtrl.getAllMessage);
router.get('/:id', [roleJwt.verifyToken], messageCtrl.getOneMessage);
router.put(
  '/:id',
  [roleJwt.verifyToken || roleJwt.isAdmin],
  multer,
  messageCtrl.modifyMessage
);
router.post('/', [roleJwt.verifyToken], multer, messageCtrl.createMessage);
router.delete(
  '/:id',
  [roleJwt.isAdmin || roleJwt.verifyToken],
  messageCtrl.deleteMessage
);

module.exports = router;
