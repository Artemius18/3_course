const { PrismaClient } = require('@prisma/client');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/faculties', async (req, res) => {
    try {
        const faculties = await prisma.fACULTY.findMany();
        res.json(faculties);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get("/api/pulpits", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const pulpits = await prisma.PULPIT.findMany({
      skip: skip, 
      take: limit,
    });

    const pulpitsWithTeacherCount = await Promise.all(pulpits.map(async (pulpit) => {
      const teacherCount = await prisma.TEACHER.count({ where: { PULPIT: pulpit.PULPIT } });
      return {
        ...pulpit,
        teacherCount: teacherCount,
      };
    }));

    res.json(pulpitsWithTeacherCount);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.get('/api/subjects', async (req, res) => {
    try {
        const subjects = await prisma.sUBJECT.findMany();
        res.json(subjects);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get('/api/teachers', async (req, res) => {
  try {
      const teachers = await prisma.tEACHER.findMany();
      res.json(teachers);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.get('/api/auditoriumstypes', async (req, res) => {
  try {
      const auditoriumTypes = await prisma.aUDITORIUM_TYPE.findMany();
      res.json(auditoriumTypes);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.get('/api/auditoriums', async (req, res) => {
  try {
      const auditoriums = await prisma.aUDITORIUM.findMany();
      res.json(auditoriums);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.get('/api/faculty/:id/subjects', async (req, res) => {
  try {
      const faculty = await prisma.FACULTY.findUnique({
          where: { FACULTY: req.params.id },
          include: {
              PULPIT_PULPIT_FACULTYToFACULTY: {
                  include: { SUBJECT_SUBJECT_PULPITToPULPIT: true }
              }
          }
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
      const auditoriums = await prisma.aUDITORIUM.findMany({ where: { AUDITORIUM_TYPE: req.params.id } });
      res.json(auditoriums);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.get('/api/auditoriumsWithComp1', async (req, res) => {
  try {
      const auditoriums = await prisma.aUDITORIUM.findMany({
          where: { 
              AUDITORIUM: {
                  endsWith: '1'
              }
          }
      });
      res.json(auditoriums);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});


app.get('/api/pulpitsWithoutTeachers', async (req, res) => {
  try {
      const pulpits = await prisma.pULPIT.findMany({
          where: { 
              TEACHER_TEACHER_PULPITToPULPIT: {
                  none: {}
              }
          }
      });
      res.json(pulpits);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.get('/api/pulpitsWithVladimir', async (req, res) => {
  try {
      const pulpits = await prisma.pULPIT.findMany({
          where: { 
              TEACHER_TEACHER_PULPITToPULPIT: {
                  some: {
                      TEACHER_NAME: {
                          contains: 'Владимир'
                      }
                  }
              }
          }
      });
      res.json(pulpits);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.get('/api/auditoriumsSameCount', async (req, res) => {
  try {
      const auditoriums = await prisma.aUDITORIUM.groupBy({
          by: ['AUDITORIUM_TYPE', 'AUDITORIUM_CAPACITY'],
          _count: true,
      });
      res.json(auditoriums);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.post('/api/faculties', async (req, res) => {
  const { FACULTY, FACULTY_NAME } = req.body;
  try {
      const newFaculty = await prisma.fACULTY.create({ data: { FACULTY, FACULTY_NAME } });
      res.json(newFaculty);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.post('/api/pulpits', async (req, res) => {
  const { PULPIT, PULPIT_NAME, FACULTY } = req.body;
  try {
      const newPulpit = await prisma.pULPIT.create({ data: { PULPIT, PULPIT_NAME, FACULTY } });
      res.json(newPulpit);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.post('/api/subjects', async (req, res) => {
  const { SUBJECT, SUBJECT_NAME, PULPIT } = req.body;
  try {
      const newSubject = await prisma.sUBJECT.create({ data: { SUBJECT, SUBJECT_NAME, PULPIT } });
      res.json(newSubject);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.post('/api/teachers', async (req, res) => {
  const { TEACHER, TEACHER_NAME, PULPIT } = req.body;
  try {
      const newTeacher = await prisma.tEACHER.create({ data: { TEACHER, TEACHER_NAME, PULPIT } });
      res.json(newTeacher);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.post('/api/auditoriumstypes', async (req, res) => {
  const { AUDITORIUM_TYPE, AUDITORIUM_TYPENAME } = req.body;
  try {
      const newAuditoriumType = await prisma.aUDITORIUM_TYPE.create({ data: { AUDITORIUM_TYPE, AUDITORIUM_TYPENAME } });
      res.json(newAuditoriumType);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.post('/api/auditoriums', async (req, res) => {
  const { AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE } = req.body;
  try {
      const newAuditorium = await prisma.aUDITORIUM.create({ data: { AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE } });
      res.json(newAuditorium);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.put('/api/faculties', async (req, res) => {
  const { FACULTY, FACULTY_NAME } = req.body;
  try {
      const updatedFaculty = await prisma.fACULTY.update({ where: { FACULTY }, data: { FACULTY_NAME } });
      res.json(updatedFaculty);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.put('/api/pulpits', async (req, res) => {
  const { PULPIT, PULPIT_NAME, FACULTY } = req.body;
  try {
      const updatedPulpit = await prisma.pULPIT.update({ where: { PULPIT }, data: { PULPIT_NAME, FACULTY } });
      res.json(updatedPulpit);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.put('/api/subjects', async (req, res) => {
  const { SUBJECT, SUBJECT_NAME, PULPIT } = req.body;
  try {
      const updatedSubject = await prisma.sUBJECT.update({ where: { SUBJECT }, data: { SUBJECT_NAME, PULPIT } });
      res.json(updatedSubject);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.put('/api/teachers', async (req, res) => {
  const { TEACHER, TEACHER_NAME, PULPIT } = req.body;
  try {
      const updatedTeacher = await prisma.tEACHER.update({ where: { TEACHER }, data: { TEACHER_NAME, PULPIT } });
      res.json(updatedTeacher);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.put('/api/auditoriumstypes', async (req, res) => {
  const { AUDITORIUM_TYPE, AUDITORIUM_TYPENAME } = req.body;
  try {
      const updatedAuditoriumType = await prisma.aUDITORIUM_TYPE.update({ where: { AUDITORIUM_TYPE }, data: { AUDITORIUM_TYPENAME } });
      res.json(updatedAuditoriumType);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.put('/api/auditoriums', async (req, res) => {
  const { AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE } = req.body;
  try {
      const updatedAuditorium = await prisma.aUDITORIUM.update({ where: { AUDITORIUM }, data: { AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE } });
      res.json(updatedAuditorium);
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});


app.delete('/api/faculties/:id', async (req, res) => {
  try {
      const deletedFaculty = await prisma.fACULTY.delete({ where: { FACULTY: req.params.id } });
      res.json({ message: 'Faculty deleted' });
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.delete('/api/pulpits/:id', async (req, res) => {
  try {
      const deletedPulpit = await prisma.pULPIT.delete({ where: { PULPIT: req.params.id } });
      res.json({ message: 'Pulpit deleted' });
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.delete('/api/subjects/:id', async (req, res) => {
  try {
      const deletedSubject = await prisma.sUBJECT.delete({ where: { SUBJECT: req.params.id } });
      res.json({ message: 'Subject deleted' });
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.delete('/api/teachers/:id', async (req, res) => {
  try {
      const deletedTeacher = await prisma.tEACHER.delete({ where: { TEACHER: req.params.id } });
      res.json({ message: 'Teacher deleted' });
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.delete('/api/auditoriumtypes/:id', async (req, res) => {
  try {
      const deletedAuditoriumType = await prisma.AUDITORIUM_TYPE.delete({ where: { AUDITORIUM_TYPE: req.params.id } });
      res.json({ message: 'Auditorium type deleted' });
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});

app.delete('/api/auditoriums/:id', async (req, res) => {
  try {
      const deletedAuditorium = await prisma.aUDITORIUM.delete({ where: { AUDITORIUM: req.params.id } });
      res.json({ message: 'Auditorium deleted' });
  } catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


async function tranz() {
  const auditoriums = await prisma.aUDITORIUM.findMany()

  const increaseCapacity = auditoriums.map(auditorium => 
    prisma.aUDITORIUM.update({
      where: { AUDITORIUM: auditorium.AUDITORIUM },
      data: { AUDITORIUM_CAPACITY: { increment: 100 } },
    })
  )

  const decreaseCapacity = auditoriums.map(auditorium => 
    prisma.aUDITORIUM.update({
      where: { AUDITORIUM: auditorium.AUDITORIUM },
      data: { AUDITORIUM_CAPACITY: { decrement: 100 } },
    })
  )

  try {
    await prisma.$transaction([...increaseCapacity, ...decreaseCapacity])
    console.log('Transaction successful')
  } catch (error) {
    console.log('Transaction failed: ', error)
  }
}

tranz()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


//fluent 
app.route('/movie')
  .get((req, res) => {
    res.send('Get a random movie');
  })
  .post((req, res) => {
    res.send('Add a movie');
  })
  .put((req, res) => {
    res.send('Update the movie');
  })
  .delete((req, res) => {
    res.send('Delete the movie');
  });

