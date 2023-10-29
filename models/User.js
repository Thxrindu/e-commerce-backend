'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      //  association
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
