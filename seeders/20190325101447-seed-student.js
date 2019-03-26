'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Students', [{
        firstName: 'rooney',
        lastName: 'wayne',
        email: 'rw@x.com',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'christiano',
        lastName: 'ronaldo',
        email: 'cr@x.com',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'hazard',
        lastName: 'mika',
        email: 'hm@x.com',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'messi',
        lastName: 'mika',
        email: 'hm@x.com',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'balack',
        lastName: 'mika',
        email: 'hm@x.com',
        createdAt: new Date,
        updatedAt: new Date
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Students', null, {});
  }
};