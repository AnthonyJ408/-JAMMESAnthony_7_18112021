module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('comments', {
    comment: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    postId: {
      type: Sequelize.INTEGER,
    },
  });
  return Comment;
};
