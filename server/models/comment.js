module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('comments', {
    comment: {
      type: Sequelize.STRING,
    },
  });
  return Comment;
};
