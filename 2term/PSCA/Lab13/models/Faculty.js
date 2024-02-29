const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Faculty', {
    faculty: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      field: 'FACULTY'
    },
    faculty_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'FACULTY_NAME'
    }
  }, {
    sequelize,
    tableName: 'FACULTY',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_FACULTY",
        unique: true,
        fields: [
          { name: "FACULTY" },
        ]
      },
    ]
  });
};
