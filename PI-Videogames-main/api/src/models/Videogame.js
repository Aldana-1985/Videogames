const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'No description',
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ['PC'],
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.STRING,
      defaultValue: '2000-01-01',
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0.25,
    },
  },{timestamps : false});
};
