'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const productsData = [];

    for (let i = 1; i <= 12; i++) {
      productsData.push({
        name: `Product ${i}`,
        description: `Description for Product ${i}`,
        price: 20.0 + i,
        imageUrl: `https://example.com/product${i}.jpg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Products', productsData, {});
  },

  async down(queryInterface, Sequelize) {},
};
