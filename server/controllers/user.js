const db = require('../models');
const User = db.users;
const Message = db.users;
const config = require('../config/authConfig');
const Op = db.Sequelize.Op;
const Role = db.roles;
//Création de token pour sécuriser le systéme d'authentification du site
const jwt = require('jsonwebtoken');
//Package de cryptage pour les mots de passe
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
  //Enregistrement du nouvel utilisateur dans la base de donnée avec son email et un mot de passe crypté
  try {
    User.create({
      fullName: req.body.fullName,
      email: req.body.email,
      //Méthode hash de bcrypt qui va éxécuter 8 "salt" ou "round" de l'algorithme sur le mot de passe pour le crypté
      password: bcrypt.hashSync(req.body.password, 8),
    })
      .then((user) => {
        if (req.body.roles != undefined && req.body.roles[1] == config.admin) {
          Role.findAll({
            where: {
              id: {
                2: req.body.roles[0],
              },
            },
          })
            .catch((error) => {
              console.log(error);
            })
            .then(() => {
              //s'il y a un role de renseigné dans la requête l'ajoute au propriété de l'utilisateur dans mySql
              user.setRole(2).then(() => {
                res.send({ message: 'Admin créé!' });
              });
            });
        } else {
          // sinon définit le rôle "user" par défault
          user.setRole(1).then(() => {
            res.send({ message: 'Utilisateur enregistré!' });
          });
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  } catch (error) {
    console.log(error);
  }
};

exports.login = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: 'Utilisateur inconnu!' });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Mot de passe incorrect!',
        });
      }
      user
        .getRole()

        .then((roles) => {
          const token = jwt.sign(
            {
              id: user.id,
              fullName: user.fullName,
              email: user.email,
              roles: roles.name,
            },
            config.secret,
            {
              expiresIn: 86400, // 24 hours
            }
          );

          res.status(200).send({
            accessToken: token,
          });
        });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};
exports.getAllUsers = async (req, res) => {
  const users = User.findAll({ order: [['createdAt', 'DESC']] })
    .then((res) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ err });
    });
};
exports.deleteUser = async (req, res) => {
  await User.findByPk(req.params.id)
    .then((user) => {
      Message.destroy({ where: { id: user.id } });
      User.destroy({ where: { id: user.id } }).then(() => {
        res.status(200).send({ message: 'Utilisateur supprimé!' });
      });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
