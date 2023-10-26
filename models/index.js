const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.Products = require('./Product')(sequelize, Sequelize.DataTypes);

module.exports = db;
