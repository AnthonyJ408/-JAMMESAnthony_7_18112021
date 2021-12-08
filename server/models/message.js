module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define('messages', {
    title: {
      type: Sequelize.STRING(50),
    },
    author: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    fileUrl: {
      type: Sequelize.STRING(250),
    },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  });
  return Message;
};
