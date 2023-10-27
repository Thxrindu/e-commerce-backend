'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'hashedpassword1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kasun Rajitha',
          email: 'kasun@example.com',
          password: 'hashedpassword2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
