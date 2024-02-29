const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize('PAF', 'Admin', '123', {
    host: 'localhost',
    dialect: 'mssql',
    logging: false, 
    pool: {
      max: 10,
      min: 1,
      idle: 10000,
    },
  });
  
const { Faculty, Pulpit, Teacher, Subject, AuditoriumType, Auditorium } = require("./models/init-models").initModels(sequelize, DataTypes);


const print = (result) => { 
    let counter = 0; 
    console.log("-------------------------------------------------------------------------------------------------------------------------------");
    result.forEach(elem => { console.log(++counter, elem.dataValues); });
}

sequelize.authenticate()
.then(() => { console.log("Соединение с базой данных установлено"); }) 
.then(() => {
    Faculty.findAll().then(faculties => print(faculties));
    Pulpit.findAll().then(pulpits => print(pulpits));
    Teacher.findAll().then(teachers => print(teachers));
    Subject.findAll().then(subjects => print(subjects));
    AuditoriumType.findAll().then(auditorium_type => print(auditorium_type));
    Auditorium.findAll().then(auditoriums => print(auditoriums));
});