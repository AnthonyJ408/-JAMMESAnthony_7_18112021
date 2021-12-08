const db = require('../models');
const Comment = db.comments;
const Op = db.Sequelize.Op;

exports.getAllComments = async (req, res) => {
  const comments = Comment.findAll({ order: [['createdAt', 'DESC']] })
    .then((res) => {
      res.status(200).json(comments);
    })

    .catch((err) => {
      console.log(err);
      res.status(404).json({ err });
    });
};

exports.createComment = async (req, res) => {
  const comment = new Comment({
    comment: req.body.comment,
    postId: req.body.postId,
  });
  comment.userId = req.userId;

  comment
    .create()
    .then((res) => {
      res.status(201).json({ message: 'Comment saved successfully!' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
};
