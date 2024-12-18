const Sequelize = require('sequelize');

const sequelize  = require('../util/database');


const user = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    

    },
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
    
    // orders: {
    //     type: Sequelize.ARRAY,
    //     allowNull: false
    // },
    // cart:{
    //     type: Sequelize.ARRAY,
    //     allowNull: false    
    // }
});

module.exports = user;