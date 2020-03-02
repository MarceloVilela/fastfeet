module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('deliverymen', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        avatar_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
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
      })
    },
  
    down: queryInterface => {
      return queryInterface.dropTable('deliverymen')
    }
  }
  