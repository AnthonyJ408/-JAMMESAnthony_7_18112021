module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define('message', {
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    fileUrl: {
      type: Sequelize.STRING(250),
    },
  });
  return Message;
};
