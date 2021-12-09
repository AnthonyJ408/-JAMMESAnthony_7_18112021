const db = require('../models');
const User = db.users;
const jwt = require('jsonwebtoken');
const config = require('../config/authConfig');
const Op = db.Sequelize.Op;
const Role = db.roles;

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({
      message: 'Pas de token transmis!!',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Non authorisé!',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.body.userId)
    .then((user) => {
      Role.findAll({ where: { id: user.roleId } }).then((role) => {
        if (role[0].name === 'admin') {
          next();
        } else {
          res.status(401).send({
            message: 'Non authorisé!',
          });
        }
      });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

const roleJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
module.exports = roleJwt;
