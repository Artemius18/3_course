const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Subject', {
    subject: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      field: 'SUBJECT'
    },
    subject_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'SUBJECT_NAME'
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
    tableName: 'SUBJECT',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_SUBJECT",
        unique: true,
        fields: [
          { name: "SUBJECT" },
        ]
      },
    ]
  });
};
