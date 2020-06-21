const Sequelize = require('sequelize');
const db = require('../config/database');
const { now } = require('sequelize/types/lib/utils');

const Viaje = db.define('viaje', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING
    },
    precio:{
        type: Sequelize.STRING
    },
    fecha_ida:{
        type: Sequelize.DATE        
    },
    fecha_vuelta:{
        type: Sequelize.DATE        
    },
    imagen: {
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    disponibles: {
        type: Sequelize.STRING
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE

    }
  
    
});

module.exports = Viaje;
