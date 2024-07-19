
const express = require('express');
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/taskController');
const authenticate = require('../middlewares/auth');

const router = express.Router();

router.get('/', authenticate, getTasks);
router.post('/', authenticate, addTask);
router.put('/:id', authenticate, updateTask);
router.delete('/:id', authenticate, deleteTask);

module.exports = router;
