module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('recipients', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
    },
    street: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    complement: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    zip_code: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
    canceled_at: {
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('students'),
};
