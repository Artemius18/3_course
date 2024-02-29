const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Auditorium', {
    auditorium: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      field: 'AUDITORIUM'
    },
    auditorium_name: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: 'AUDITORIUM_NAME'
    },
    auditorium_capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'AUDITORIUM_CAPACITY'
    },
    auditorium_type: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'AUDITORIUM_TYPE',
        key: 'AUDITORIUM_TYPE'
      },
      field: 'AUDITORIUM_TYPE'
    }
  }, {
    sequelize,
    tableName: 'AUDITORIUM',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__AUDITORI__53726010047FF3AA",
        unique: true,
        fields: [
          { name: "AUDITORIUM" },
        ]
      },
    ]
  });
};
