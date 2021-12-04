module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User',{
    email: {
      type: Sequelize.STRING, 
      allowNull: false,
      unique: {
        msg: 'Adresse email déjà utilisée'
    }},
    password: {
      type: Sequelize.STRING,
      allowNull: false
    } ,
    fullName: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
    return User;
  };
