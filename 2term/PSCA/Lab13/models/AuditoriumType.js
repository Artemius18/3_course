const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AuditoriumType', {
    auditorium_type: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      field: 'AUDITORIUM_TYPE'
    },
    auditorium_typename: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: 'AUDITORIUM_TYPENAME'
    }
  }, {
    sequelize,
    tableName: 'AUDITORIUM_TYPE',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "AUDITORIUM_TYPE_PK",
        unique: true,
        fields: [
          { name: "AUDITORIUM_TYPE" },
        ]
      },
    ]
  });
};
