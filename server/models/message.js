module.exports = (sequelize, Sequelize) => {
  sequelize.define('Message',{
    message: {
      type: Sequelize.TEXT
    },
    fileUrl:{
      type: Sequelize.STRING(50)
    }
  })}
