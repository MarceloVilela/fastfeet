module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('recipients', 'street', {
    type: Sequelize.STRING,
  }),

  down: (queryInterface) => queryInterface.removeColumn('recipients', 'street'),
};
