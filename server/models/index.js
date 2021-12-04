const Sequelize = require('sequelize');
const config = require('../config/config');
const db = {};

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user')(sequelize, Sequelize);
db.messages = require('./message')(sequelize, Sequelize);
db.roles = require('./role')(sequelize, Sequelize);

db.roles.hasOne(db.users, {
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  foreignKey: 'roleId',
});
db.users.belongsTo(db.roles);
db.MOD = [1, 2];
module.exports = db;
