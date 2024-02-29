var DataTypes = require("sequelize").DataTypes;
var _Auditorium = require("./Auditorium");
var _AuditoriumType = require("./AuditoriumType");
var _Faculty = require("./Faculty");
var _Pulpit = require("./Pulpit");
var _Subject = require("./Subject");
var _Teacher = require("./Teacher");

function initModels(sequelize) {
  var Auditorium = _Auditorium(sequelize, DataTypes);
  var AuditoriumType = _AuditoriumType(sequelize, DataTypes);
  var Faculty = _Faculty(sequelize, DataTypes);
  var Pulpit = _Pulpit(sequelize, DataTypes);
  var Subject = _Subject(sequelize, DataTypes);
  var Teacher = _Teacher(sequelize, DataTypes);

  Auditorium.belongsTo(AuditoriumType, { as: "auditorium_type_auditorium_type", foreignKey: "auditorium_type"});
  AuditoriumType.hasMany(Auditorium, { as: "auditoria", foreignKey: "auditorium_type"});
  Pulpit.belongsTo(Faculty, { as: "faculty_faculty", foreignKey: "faculty"});
  Faculty.hasMany(Pulpit, { as: "pulpits", foreignKey: "faculty"});
  Subject.belongsTo(Pulpit, { as: "pulpit_pulpit", foreignKey: "pulpit"});
  Pulpit.hasMany(Subject, { as: "subjects", foreignKey: "pulpit"});
  Teacher.belongsTo(Pulpit, { as: "pulpit_pulpit", foreignKey: "pulpit"});
  Pulpit.hasMany(Teacher, { as: "teachers", foreignKey: "pulpit"});

  return {
    Auditorium,
    AuditoriumType,
    Faculty,
    Pulpit,
    Subject,
    Teacher,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
