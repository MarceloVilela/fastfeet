module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('delivery_problems', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          autoIncrement: true,
          primaryKey: true,
        },
        delivery_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'deliveries', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      })
    },
  
    down: queryInterface => {
      return queryInterface.dropTable('delivery_problems')
    }
  }
  