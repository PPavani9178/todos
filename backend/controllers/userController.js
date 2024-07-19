const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users=[];
const registerUser = (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = { id: Date.now().toString(), username, password: hashedPassword };
    users.push(newUser);
    res.status(201).json(newUser);
};

const loginUser = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

module.exports = { registerUser, loginUser };