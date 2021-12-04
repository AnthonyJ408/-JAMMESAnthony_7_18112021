const db = require('../models');
const MOD = db.MOD;
const User = db.users;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: 'Email déja utilisé!',
      });
      return;
    }
    next();
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles != undefined) {
    if (!MOD.includes(req.body.roles[0])) {
      res.status(400).send({
        message: "Erreur!Le rôle n'existe pas  = " + req.body.roles[0],
      });
      return;
    }
  }
  next();
};

const verifyRole = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifyRole;
