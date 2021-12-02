module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User',{
    email: {
      type: Sequelize.STRING,
      unique: {
        msg: 'Adresse email déjà utilisée'
    }},
    password: {
      type: Sequelize.STRING,
    } ,
    fullName: {
      type: Sequelize.STRING,
    }
  });
    return User;
  };
