const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Pulpit', {
    pulpit: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      field: 'PULPIT'
    },
    pulpit_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'PULPIT_NAME'
    },
    faculty: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'FACULTY',
        key: 'FACULTY'
      },
      field: 'FACULTY'
    }
  }, {
    sequelize,
    tableName: 'PULPIT',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_PULPIT",
        unique: true,
        fields: [
          { name: "PULPIT" },
        ]
      },
    ]
  });
};
