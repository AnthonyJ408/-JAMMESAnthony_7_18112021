const Sequelize = require('sequelize');
const config = require('../config/config');
const db = {};
const bcrypt = require('bcrypt');

const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  config.options
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user')(sequelize, Sequelize);
db.messages = require('./message')(sequelize, Sequelize);
db.roles = require('./role')(sequelize, Sequelize);


db.users.hasMany(db.messages);
db.messages.belongsTo(db.users, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
db.roles.hasOne(db.users, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: 'roleId',
});
db.users.belongsTo(db.roles);
db.MOD = [1, 2];
db.sequelize.sync();
// db.sequelize
//   .sync({ force: true })
//   .then(() => {
//     db.roles.create({ id: 1, name: 'user' });
//   })
//   .catch((res) => {
//     console.log(res);
//   })
//   .then(() => {
//     db.roles.create({ id: 2, name: 'admin' });
//   })
//   .catch((res) => {
//     console.log(res);
//   })
//   .then(() => {
//     db.users
//       .create({
//         email: 'groupomaniaAdmin@gmail.com',
//         password: bcrypt.hashSync('Groupomania7!', 8),
//         fullName: 'Admin Groupomania',
//       })
//       .then((user) => {
//         user.setRole(2).catch((res) => {
//           console.log(res);
//         });
//       })
//       .catch((res) => {
//         console.log(res);
//       });
//   })
//   .then(() => {
//     db.users
//       .create({
//         email: 'groupomaniaUser@gmail.com',
//         password: bcrypt.hashSync('Groupomania7!', 8),
//         fullName: 'User Groupomania',
//       })
//       .then((user) => {
//         user.setRole(1).catch((res) => {
//           console.log(res);
//         });
//       })
//       .catch((res) => {
//         console.log(res);
//       });
//   })
//   .then(() => {
//     db.users
//       .create({
//         email: 'groupomaniaUser2@gmail.com',
//         password: bcrypt.hashSync('Groupomania7!', 8),
//         fullName: 'UserDeux Groupomania',
//       })
//       .then((user) => {
//         user.setRole(1).catch((res) => {
//           console.log(res);
//         });
//       })
//       .catch((res) => {
//         console.log(res);
//       });
//   })

//   .catch((error) => {
//     console.log(error);
//   }),
  (module.exports = db);
