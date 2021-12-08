const db = require('../models');
const User = db.users;
const jwt = require('jsonwebtoken');
const config = require('../config/authConfig');
const Message = db.messages;
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
  const id = req.params.id;
  //Méthode .findByPk qui va retourner une message avec l'id envoyé dans la requête
  Message.findByPk(id)
    .then((message) => {
      const author = message.dataValues.author;
      User.findAll({
        where: {
          fullName: author,
        },
      }).then((user) => {
        const role = user.dataValues.roleId;
        Role.findAll({
          where: {
            id: role,
          },
        }).then((roles) => {
          console.log(roles.name);
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
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

const roleJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
module.exports = roleJwt;
