// Descripción: Este fichero contiene el modelo de la tabla de reparaciones de la base de datos.

const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Repairs = db.define('repair', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    enum: ['pending', 'completed', 'cancelled'],
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Repairs;
