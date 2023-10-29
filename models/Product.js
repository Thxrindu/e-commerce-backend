'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Product extends Model {
    static associate(models) {
      //  associations
    }
  }

  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );

  return Product;
};
