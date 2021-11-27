module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User',{
    email: {
      type: Sequelize.STRING,
      unique:true
    },
    password: {
      type: Sequelize.STRING
    } 
    // firstName: Sequelize, STRING,
    // lastName: Sequelize, STRING,
    // admin:  Sequelize, BOOLEAN,false
  });
    return User;
  };
