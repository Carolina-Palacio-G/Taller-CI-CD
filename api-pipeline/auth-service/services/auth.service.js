const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/users.json');

function loadUsers() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

function addUser(user) {
  const users = loadUsers();
  users.push(user);
  saveUsers(users);
}

function findUser(username) {
  const users = loadUsers();
  return users.find(u => u.username === username);
}

module.exports = { addUser, findUser };
