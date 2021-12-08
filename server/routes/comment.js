const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const { roleJwt } = require('../middleware');

router.get(
  '/',
  [roleJwt.verifyToken || roleJwt.isAdmin],
  commentCtrl.getAllComments
);
router.post(
  '/',
  [roleJwt.verifyToken || roleJwt.isAdmin],
  commentCtrl.createComment
);

module.exports = router;
