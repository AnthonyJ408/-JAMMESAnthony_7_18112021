//Récupération du modèle User de sequelize
const db = require('../models');
const Message = db.messages;
const Op = db.Sequelize.Op;
const sequelize = require('sequelize');
//Package node qui permet d'accéder au dossier du système
const fs = require('fs');

exports.createMessage = (req, res, next) => {
  const messageRequest = req.body;
  if (req.file != undefined) {
    const messageFile = {
      //L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
      ...messageRequest,
      //Récupération de l'image de façon dynamique dans le dossier images
      fileUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    };
    //Méthode "create" utilisée pour envoyer les données enregistrés
    Message.create(messageFile)
      .then(() => {
        res.status(201).send({
          message: 'Message enregistré !',
        });
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
    Message.create(messageRequest)
      .then(() => {
        res.status(201).send({
          message: 'Message enregistré !',
        });
      })
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
exports.deleteMessage = async (req, res, next) => {
  //on retrouve l'objet avec l'id contenu dans les paramétres de route

  const message = await Message.findByPk(req.params.id);
  console.log(message);
  if (message.dataValues.fileUrl) {
    const filename = message.fileUrl.split('/images/')[1];
    //Supprime l'image avec la fonction unlink de fs
    fs.unlink(`images/${filename}`, () => {
      //Méthode .destroy qui va supprimer un objet avec l'id renseigné dans les paramétres
      Message.destroy({ where: { id: message.id } });
      res.status(200).json({ message: 'Message supprimé!' });
    });
  } else {
    Message.destroy({ where: { id: message.id } });
    res.status(200).json({ message: 'Message supprimé!' });
  }
};

exports.getAllMessage = (req, res, next) => {
  //Méthode .find qui va retourner toute la colection messages stockée dans MongoDB
  Message.findAll({ limit: 50, order: [['updatedAt', 'DESC']] })
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};
