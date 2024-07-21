//const bcrypt = require('bcrypt');
const Users = require('../database/client').users;

async function create(username, email, password, role) {
  const user = await Users.create({
    data: {
      username: username,
      email: email,
      password: password, //await bcrypt.hash(password, +process.env.BCRYPT_SALT_ROUNDS),
      role: role,
    }
  });
  delete user.password;
  return user;
}

async function getByUsername(username) {
  const user = await Users.findFirst({
    where: { username: username },
  });
  if (user) { delete user.password; }
  return user;
}

async function getAll() {
  return (await Users.findMany()).map(u => {
    delete u.password;
    return u;
  });
}

async function getById(id) {
  const user = await Users.findUnique({
    where: { id: id }
  });
  if (user) { delete user.password; }
  return user;
}

async function deleteById(id) {
  return await Users.delete({
    where: { id: id }
  });
}

async function verifyPassword(id, password) {
  const user = await Users.findUnique({ where: { id: id } })
  return password === user?.password; //await bcrypt.compare(password, user.password);
}

module.exports = { create, getByUsername, getAll, getById, deleteById, verifyPassword };