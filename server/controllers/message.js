//Récupération du modèle User de sequelize
const db = require('../models');
const Message = db.messages;
const Op = db.Sequelize.Op;
//Package node qui permet d'accéder au dossier du système
const fs = require('fs');
const { messages } = require('../models');

exports.createMessage = (req, res, next) => {
  const messageRequest = req.body;
  if (req.body.filename != undefined) {
    const messageFile = {
      //L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
      ...messageRequest,
      //Récupération de l'image de façon dynamique dans le dossier images
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    };
    //Méthode "create" utilisée pour envoyer les données enregistrés
    Message.create(...messageFile)
      .then(() => res.status(201).json({ message: 'registered message !' }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    Message.create(messageRequest)
      .then(() => res.status(201).json({ message: 'registered message !' }))
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.getOneMessage = (req, res, next) => {
  const id = req.params.id;
  //Méthode .findByPk qui va retourner une message avec l'id envoyé dans la requête
  Message.findByPk(id)
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyMessage = (req, res, next) => {
  //Vérifie s'il y a ou non une image dans la requête
  const messageObject = req.file
    ? {
        ...JSON.parse(req.body.message),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  //Méthode .updateOne qui prend deux paramétres l'id du produit et le nouveau produit à actualiser
  const id = req.params.id;
  Message.update(req.body, {
    where: { id: id } && { ...messageObject, id: id },
  })
    .then(() => res.status(200).json({ message: 'Message modified!' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteMessage = (req, res, next) => {
  const id = req.params.id;
  //on retrouve l'objet avec l'id contenu dans les paramétres de route
  Message.findByPk({ id: id })
    .then((message) => {
      const filename = message.imageUrl.split('/images/')[1];
      //Supprime l'image avec la fonction unlink de fs
      fs.unlink(`images/${filename}`, () => {
        //Méthode .deleteOne qui va supprimer un objet avec l'id renseigné dans les paramétres
        Message.destroy({ where: { id: id } })
          .then(() => res.status(200).json({ message: 'Message deleted !' }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllMessage = (req, res, next) => {
  console.log(Message);
  //Méthode .find qui va retourner toute la colection messages stockée dans MongoDB
  Message.findAll({ limit: 50, order: [['updatedAt', 'DESC']] })
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
exports.likeMessage = (req, res, next) => {
  const id = req.params.id;
  switch (req.body.like) {
    // 3 cas possibles dans l'objet like de la requête :(1,-1 ou 0)
    case 1:
      //Avec la valeur 1 on ajoute +1 dans le tableau des "likes", et on ajoute l'id
      //de l'utilisateur au tableau "usersLiked" avec les opérateurs MongoDB "$inc,$push"
      Message.update(
        {
          $inc: { likes: 1 },
          $push: { usersLiked: req.body.userId },
        },
        { where: { id: id } }
      )
        .then(() => {
          res.status(200).json({
            message: `User: ${req.body.userId} liked message:${req.params.id}`,
          });
        })
        .catch((error) => {
          res.status(400).json({ error: error });
        });
      break;
    case -1:
      //Avec la valeur -1 on ajoute +1 dans le tableau des "dislikes", et on ajoute l'id
      // de l'utilisateur au tableau "usersdisliked" avec les opérateurs MongoDB "$inc,$push"
      Message.update(
        {
          $inc: { dislikes: 1 },
          $push: { usersLiked: req.body.userId },
        },
        { where: { id: id } }
      )
        .then(() => {
          res.status(200).json({
            message: `User: ${req.body.userId} disliked message:${req.params.id}`,
          });
        })
        .catch((error) => {
          res.status(400).json({ error: error });
        });
      break;
    case 0:
      //Avec la valeur 0 on annule en ajoutant -1 dans le tableau correspondant  et on enléve l'id
      // de l'utilisateur du tableau correspondant avec les opérateurs MongoDB "$inc,$pull"
      Message.findByPk(id)
        .then((arrayLike) => {
          //On cherche une correspondance de l'utilisateur dans un des deux tableau usersliked ou usersdisliked
          if (
            arrayLike.usersLiked.find((userId) => userId === req.body.userId)
          ) {
            Message.update(
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId },
              },
              { where: { id: id } }
            )
              .then(() => {
                res.status(200).json({
                  message: `User: ${req.body.userId} cancelled his like on message:${req.params.id}`,
                });
              })
              .catch((error) => {
                res.status(400).json({ error: error });
              });
          } else if (
            arrayLike.usersDisliked.find((userId) => userId === req.body.userId)
          ) {
            Message.update(
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId },
              },
              { where: { id: id } }
            )
              .then(() => {
                res.status(200).json({
                  message: `User: ${req.body.userId} cancelled his like on message:${req.params.id}`,
                });
              })
              .catch((error) => {
                res.status(400).json({ error: error });
              });
          }
        })
        .catch((error) => {
          res.status(404).json({ error: error });
        });
      break;
  }
};
