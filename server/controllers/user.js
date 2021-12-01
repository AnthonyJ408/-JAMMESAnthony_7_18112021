//Récupération du modèle User de sequelize
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
//Création de token pour sécuriser le systéme d'authentification du site
const jwt = require("jsonwebtoken");
//Package de cryptage pour les mots de passe
const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
  bcrypt
    //Méthode hash de bcrypt qui va éxécuter 9 "salt" ou "round" de l'algorithme sur le mot de passe pour le crypté
    .hash(req.body.password, 9)
    .then((hash) => {
      const user = {
        email: req.body.email,
        password: hash,
        fullName:req.body.fullName
      };
      //Enregistrement du nouvel utilisateur dans la base de donnée avec son email et un mot de passe crypté
      User
        .create(user)
        .then(() => res.status(201).json({ message: "Utilisateur créé!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.login = (req, res, next) => {
  //Récupérer l'utilisateur dans la base de donnée via son adresse mail qui est dans la requête
  const email = req.body.email;
  var condition = email? { email: { [Op.like]: `%${email}%` } } : null;
  console.log(condition)
  User.findOne({ where: condition })
  .then((user) => {
    console.log(user.password)
    if (!user) {
      return res.status(401).json({ error: "Utilisateur introuvable!" });
    }
    //Méthode compare de bcrypt qui va comparer le hash entrant et le hash de la base de donnée
    bcrypt
      .compare(req.body.password, user.password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorect!" });
        }
        //UserId encodé pour gérer les utilisateurs, pour pouvoir reconnaître quel utilisateur a créé quel produit
        res.status(200).json({
          fullName: user.fullName,
          userId: user.id,
          token: jwt.sign({ userId: user.id }, "MEGASECRETkey25054426165", {
            expiresIn: "24h",
          }),
        });
      })
      .catch((error) => res.status(501).json({ error }));
  })
  .catch((error) => res.status(500).json({ error }));
};

    

