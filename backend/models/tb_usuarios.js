'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_usuarios extends Model {
    static associate(models) {
      // define association here
    }
  }
  tb_usuarios.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    telefone: {
      type: DataTypes.STRING
    },
    senha_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user'
    }
  }, {
    sequelize,
    modelName: 'tb_usuarios',
    tableName: 'tb_usuarios',
    timestamps: true
  });
  return tb_usuarios;
};