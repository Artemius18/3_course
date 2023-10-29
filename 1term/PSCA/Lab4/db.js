// Моделируем таблицу базы данных (БД) с помощью массива.
let db = [];

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