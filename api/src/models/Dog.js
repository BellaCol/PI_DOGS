const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Dog= sequelize.define('Dog', 
  {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement:true,
      unique: true,
      primaryKey:true
     },
    
     url:{
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, 
  { timestamps: false });
  

  return Dog
};
