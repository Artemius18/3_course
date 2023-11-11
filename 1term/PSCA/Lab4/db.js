const db = [
  {
    "id": 1,
    "name": "Artyom",
    "bday": "2003-10-11"
  },
  {
    "id": 2,
    "name": "Elena",
    "bday": "1990-05-15"
  },
  {
    "id": 3,
    "name": "Alexey",
    "bday": "1987-12-03"
  },
  {
    "id": 4,
    "name": "Natalia",
    "bday": "1995-08-22"
  },
  {
    "id": 5,
    "name": "Ivan",
    "bday": "1982-06-30"
  }
];

const DB = {
  select: () => db,
  insert: (row) => {
    db.push(row);
    return row;
  },
  update: (id, updatedRow) => {
    const index = db.findIndex((row) => row.id === id);
    if (index !== -1) {
      db[index] = { ...db[index], ...updatedRow };
      return db[index];
    }
    return null;
  },
  delete: (id) => {
    const index = db.findIndex((row) => row.id === id);
    if (index !== -1) {
      const deletedRow = db[index];
      db.splice(index, 1);
      return deletedRow;
    }
    return null;
  },
};

module.exports = { DB };