'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable('transactions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            users_private_data_id: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'users_private_data',
                    key: 'id'
                },
                allowNull: false
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            amount: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            created_at: {
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
                type: Sequelize.DATE
            }
        })
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable('transactions')
    }
};
