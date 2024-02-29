const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Teacher', {
    teacher: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      field: 'TEACHER'
    },
    teacher_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'TEACHER_NAME'
    },
    pulpit: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'PULPIT',
        key: 'PULPIT'
      },
      field: 'PULPIT'
    }
  }, {
    sequelize,
    tableName: 'TEACHER',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TEACHER",
        unique: true,
        fields: [
          { name: "TEACHER" },
        ]
      },
    ]
  });
};
