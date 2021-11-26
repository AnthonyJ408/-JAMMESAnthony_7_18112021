const express = require("express");
const router = express.Router();
//Express Validator va vérifier les données contenu dans le champ "body"
const { body } = require("express-validator");
const auth = require("../middleware/auth");
const valid = require("../middleware/validator");
const multer = require("../middleware/multer-config");
const messageCtrl = require("../controllers/message");
//CRUD Messages avec vérifications des saisies via Express-validator
//Chaques routes est contrôllées avec Auth pour vérifier si l'utilisateur a les droits avant d'être exécutées
router.get("/", auth, messageCtrl.getAllMessage);
router.post(
  "/",
  body("message")
    .isLength({ max: 50 })
    .withMessage("must be a maximum of 50 chars long"),
  valid,
  auth,
  multer,
  messageCtrl.createMessage
);
router.get("/:id", auth, messageCtrl.getOneMessage);
router.put(
  "/:id",
  body("message")
    .isLength({ max: 50 })
    .withMessage("must be a maximum of 50 chars long"),
  valid,
  auth,
  multer,
  messageCtrl.modifyMessage
);
router.delete("/:id", auth, messageCtrl.deleteMessage);
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
  auth,
  messageCtrl.likeMessage
);
//Exports des routes messages
module.exports = router;
