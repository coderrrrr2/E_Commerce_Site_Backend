const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    

    },
    quantity: Sequelize.INTEGER
});

module.exports = order;