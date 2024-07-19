require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt'); 
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(bodyParser.json());

const users = []; 
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';


app.get("/",(req,res)=>{
    res.send("home page")
})
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }
   
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});


app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const Port = process.env.PORT || 8080;
app.listen(8080, () => {
    console.log(`Server is running on port ${Port}`);
});