const express = require("express");
const router = express.Router();
//Express Validator va vérifier les données contenu dans le champ "body"
const { body } = require("express-validator");
const { roleJwt } = require("../middleware");
const valid = require("../middleware/validator");
const multer = require("../middleware/multer-config");
const messageCtrl = require("../controllers/message");
//CRUD Messages avec vérifications des saisies via Express-validator
//Chaques routes est contrôllées avec Auth pour vérifier si l'utilisateur a les droits avant d'être exécutées
router.get("/", messageCtrl.getAllMessage);
router.post(
  "/",
  body("message")
    .isLength({ max: 2000 })
    .withMessage("Maximum 2000 caractères!"),
  valid,
  multer,
  messageCtrl.createMessage
);
router.get("/:id", messageCtrl.getOneMessage);
router.put(
  "/:id",
  body("message")
    .isLength({ max: 2000 })
    .withMessage("Maximum 2000 caractères!"),
  valid,
  multer,
  messageCtrl.modifyMessage
);
router.delete(
  "/:id",
  [roleJwt.verifyToken, roleJwt.isAdmin],
  messageCtrl.deleteMessage
);
router.post(
  "/:id/like",
  body("userId")
    .isLength({ min: 5, max: 50 })
    .withMessage("must be atleast 5 chars long and a maximum of 50 chars long"),
  body("like")
    .isDecimal()
    .isLength({ max: 2 })
    .withMessage("must be a maximum of 2 chars long"),
  valid,
  messageCtrl.likeMessage
);
//Exports des routes messages
module.exports = router;
