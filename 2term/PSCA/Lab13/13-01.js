const { Faculty, Pulpit, Teacher, Subject, AuditoriumType, Auditorium } = require('./models/models.js');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/faculties', async (req, res) => {
    try {
        const faculties = await Faculty.findAll();
        res.json(faculties);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get('/api/pulpits', async (req, res) => {
    try {
        const pulpits = await Pulpit.findAll();
        res.json(pulpits);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get('/api/subjects', async (req, res) => {
    try {
        const subjects = await Subject.findAll();
        res.json(subjects);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get('/api/teachers', async (req, res) => {
  try {
      const teachers = await Teacher.findAll();
      res.json(teachers);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});


app.get('/api/auditoriumstypes', async (req, res) => {
  try {
      const auditoriumTypes = await AuditoriumType.findAll();
      res.json(auditoriumTypes);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.get('/api/auditoriums', async (req, res) => {
  try {
      const auditoriums = await Auditorium.findAll();
      res.json(auditoriums);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.get('/api/faculty/:id/subjects', async (req, res) => {
  try {
      const faculty = await Faculty.findOne({
          where: { FACULTY: req.params.id },
          include: [{
              model: Pulpit,
              include: [Subject]
          }]
      });
      if (!faculty) {
          res.status(404).send('Faculty not found');
      } else {
          res.json(faculty);
      }
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});


app.get('/api/auditoriumtypes/:id/auditoriums', async (req, res) => {
  try {
      const auditoriums = await Auditorium.findAll({ where: { AUDITORIUM_TYPE: req.params.id } });
      res.json(auditoriums);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

//GET	api/auditoriumsSameCount

app.post('/api/faculties', async (req, res) => {
  const { FACULTY, FACULTY_NAME } = req.body;
  try {
      const newFaculty = await Faculty.create({ FACULTY, FACULTY_NAME });
      res.json(newFaculty);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.post('/api/pulpits', async (req, res) => {
  const { PULPIT, PULPIT_NAME, FACULTY } = req.body;
  try {
      const newPulpit = await Pulpit.create({ PULPIT, PULPIT_NAME, FACULTY });
      res.json(newPulpit);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.post('/api/subjects', async (req, res) => {
  const { SUBJECT, SUBJECT_NAME, PULPIT } = req.body;
  try {
      const newSubject = await Subject.create({ SUBJECT, SUBJECT_NAME, PULPIT });
      res.json(newSubject);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.post('/api/teachers', async (req, res) => {
  const { TEACHER, TEACHER_NAME, PULPIT } = req.body;
  try {
      const newTeacher = await Teacher.create({ TEACHER, TEACHER_NAME, PULPIT });
      res.json(newTeacher);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.post('/api/auditoriumstypes', async (req, res) => {
  const { AUDITORIUM_TYPE, AUDITORIUM_TYPENAME } = req.body;
  try {
      const newAuditoriumType = await AuditoriumType.create({ AUDITORIUM_TYPE, AUDITORIUM_TYPENAME });
      res.json(newAuditoriumType);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.post('/api/auditoriums', async (req, res) => {
  const { AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE } = req.body;
  try {
      const newAuditorium = await Auditorium.create({ AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE });
      res.json(newAuditorium);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.put('/api/faculties', async (req, res) => {
  const { FACULTY, FACULTY_NAME } = req.body;
  try {
      const updatedFaculty = await Faculty.update({ FACULTY_NAME }, { where: { FACULTY } });
      if (updatedFaculty[0] === 0) {
          res.status(404).send('Faculty not found');
      } else {
          res.json(updatedFaculty);
      }
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.put('/api/pulpits', async (req, res) => {
  const { PULPIT, PULPIT_NAME, FACULTY } = req.body;
  try {
      const updatedPulpit = await Pulpit.update({ PULPIT_NAME, FACULTY }, { where: { PULPIT } });
      if (updatedPulpit[0] === 0) {
          res.status(404).send('Pulpit not found');
      } else {
          res.json(updatedPulpit);
      }
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.put('/api/subjects', async (req, res) => {
  const { SUBJECT, SUBJECT_NAME, PULPIT } = req.body;
  try {
      const updatedSubject = await Subject.update({ SUBJECT_NAME, PULPIT }, { where: { SUBJECT } });
      if (updatedSubject[0] === 0) {
          res.status(404).send('Subject not found');
      } else {
          res.json(updatedSubject);
      }
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.put('/api/teachers', async (req, res) => {
  const { TEACHER, TEACHER_NAME, PULPIT } = req.body;
  try {
      const updatedTeacher = await Teacher.update({ TEACHER_NAME, PULPIT }, { where: { TEACHER } });
      if (updatedTeacher[0] === 0) {
          res.status(404).send('Teacher not found');
      } else {
          res.json(updatedTeacher);
      }
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.put('/api/auditoriumstypes', async (req, res) => {
  const { AUDITORIUM_TYPE, AUDITORIUM_TYPENAME } = req.body;
  try {
      const updatedAuditoriumType = await AuditoriumType.update({ AUDITORIUM_TYPENAME }, { where: { AUDITORIUM_TYPE } });
      if (updatedAuditoriumType[0] === 0) {
          res.status(404).send('Auditorium type not found');
      } else {
          res.json(updatedAuditoriumType);
      }
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.put('/api/auditoriums', async (req, res) => {
  const { AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE } = req.body;
  try {
      const updatedAuditorium = await Auditorium.update({ AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE }, { where: { AUDITORIUM } });
      if (updatedAuditorium[0] === 0) {
          res.status(404).send('Auditorium not found');
      } else {
          res.json(updatedAuditorium);
      }
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});


// TO DO: доделать нормальное удаление факультета 
app.delete('/api/faculties/:id', async (req, res) => {
  try {
      const deletedFaculty = await Faculty.destroy({ where: { FACULTY: req.params.id } });
      if (deletedFaculty === 0) {
          res.status(404).send('Faculty not found');
      } else {
          res.json({ message: 'Faculty deleted' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.delete('/api/pulpits/:id', async (req, res) => {
  try {
      const deletedPulpit = await Pulpit.destroy({ where: { PULPIT: req.params.id } });
      if (deletedPulpit === 0) {
          res.status(404).send('Pulpit not found');
      } else {
          res.json({ message: 'Pulpit deleted' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.delete('/api/subjects/:id', async (req, res) => {
  try {
      const deletedSubject = await Subject.destroy({ where: { SUBJECT: req.params.id } });
      if (deletedSubject === 0) {
          res.status(404).send('Subject not found');
      } else {
          res.json({ message: 'Subject deleted' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.delete('/api/teachers/:id', async (req, res) => {
  try {
      const deletedTeacher = await Teacher.destroy({ where: { TEACHER: req.params.id } });
      if (deletedTeacher === 0) {
          res.status(404).send('Teacher not found');
      } else {
          res.json({ message: 'Teacher deleted' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.delete('/api/auditoriumtypes/:id', async (req, res) => {
  try {
      const deletedAuditoriumType = await AuditoriumType.destroy({ where: { AUDITORIUM_TYPE: req.params.id } });
      if (deletedAuditoriumType === 0) {
          res.status(404).send('Auditorium type not found');
      } else {
          res.json({ message: 'Auditorium type deleted' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.delete('/api/auditoriums/:id', async (req, res) => {
  try {
      const deletedAuditorium = await Auditorium.destroy({ where: { AUDITORIUM: req.params.id } });
      if (deletedAuditorium === 0) {
          res.status(404).send('Auditorium not found');
      } else {
          res.json({ message: 'Auditorium deleted' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

// ДОПОЛНИТЕЛЬНЫЕ ЗАПРОСЫ ДЛЯ ЗАДАНИЙ 
app.get('/api/auditoriums/capacityBetween10And60', async (req, res) => {
  try {
      const auditoriums = await Auditorium.scope('capacityBetween10And60').findAll();
      res.json(auditoriums);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.post('/api/faculties', async (req, res) => {
  const { FACULTY, FACULTY_NAME } = req.body;
  try {
      const newFaculty = await Faculty.create({ FACULTY, FACULTY_NAME });
      res.json(newFaculty);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
