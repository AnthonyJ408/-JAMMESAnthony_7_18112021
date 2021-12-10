const express = require('express');
const router = express.Router();
const valid = require('../middleware/validator');
const { verifyRole, roleJwt } = require('../middleware');
const userCtrl = require('../controllers/user');
//Express Validator va vérifier les données contenu dans le champ "body"
const { body } = require('express-validator');
//CRUD Users avec vérifications des saisies via Express-validator
router.post(
  '/signup',
  body('email')
    .isEmail()
    .withMessage("L'email doit être valide"),
  body('password')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .withMessage(
      'must contain at least eight characters, including at least one number and includes both lower and uppercase letters and special characters'
    ),
  valid,
  [verifyRole.checkDuplicateUsernameOrEmail, verifyRole.checkRolesExisted],
  userCtrl.signup
);
router.post(
  '/login',
  body('email')
    .isEmail()
    .withMessage("L'email doit être valide"),
  body('password')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .withMessage(
      'must contain at least eight characters, including at least one number and includes both lower and uppercase letters and special characters'
    ),
  valid,
  userCtrl.login
);
router.get('/user/:id', [roleJwt.verifyToken], userCtrl.getAllUsers);
router.delete('/users/:id', [roleJwt.verifyToken], userCtrl.deleteUser);
//Exports des routes users
module.exports = router;
