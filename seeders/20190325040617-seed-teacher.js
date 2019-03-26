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
    return queryInterface.bulkInsert('Teachers', [{
      firstName: 'Harry',
      lastName: 'Potter',
      email: 'hp@x.com',
      subjectId: 1,
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Ron',
      lastName: 'Weasley',
      email: 'rw@x.com',
      subjectId: 2,
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Harmione',
      lastName: 'Granger',
      email: 'hg@x.com',
      subjectId: 3,
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Hagrid',
      lastName: 'Granger',
      email: 'hg@x.com',
      subjectId: 4,
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Tuturuu',
      lastName: 'Granger',
      email: 'hg@x.com',
      subjectId: 5,
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Teachers', null, {});
  }
};
