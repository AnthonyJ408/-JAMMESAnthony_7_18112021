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

db.users = require("./user")(sequelize, Sequelize);

module.exports = db;
