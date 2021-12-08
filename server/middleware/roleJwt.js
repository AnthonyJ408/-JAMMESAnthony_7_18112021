const db = require('../models');
const User = db.users;
const jwt = require('jsonwebtoken');
const config = require('../config/authConfig');

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
  });
  User.findByPk(req.userId).then((user) => {
    user.getRole().then((roles) => {
      if (roles.name === 'admin') {
        next();
        return;
      }
      res.status(403).send({
        message: 'Rôle admin requis!',
      });
      return;
    });
  });
};

const roleJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
module.exports = roleJwt;
