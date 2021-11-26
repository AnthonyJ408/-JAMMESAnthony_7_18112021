module.exports = (sequelize, DataTypes) => {
  sequelize.define('Message',{
    email: {
      type: DataTypes,STRING,
      unique:true
    },
    password: DataTypes, STRING,
    // firstName: DataTypes, STRING,
    // lastName: DataTypes, STRING,
    // admin: false
  })}
