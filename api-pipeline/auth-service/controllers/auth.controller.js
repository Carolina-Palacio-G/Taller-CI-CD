const { addUser, findUser } = require('../services/auth.service');

const registerUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Datos incompletos' });

  const userExists = findUser(username);
  if (userExists) return res.status(409).json({ message: 'Usuario ya existe' });

  addUser({ username, password });
  res.status(201).json({ message: 'Usuario registrado' });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;
  const user = findUser(username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  res.json({ message: 'Login exitoso', username });
};

module.exports = { registerUser, loginUser };
