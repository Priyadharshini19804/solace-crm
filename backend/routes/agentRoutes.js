const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getAgents, createAgent, updateAgent, deleteAgent } = require('../controllers/agentController');

router.get('/', protect, getAgents);
router.post('/', protect, createAgent);
router.put('/:id', protect, updateAgent);
router.delete('/:id', protect, deleteAgent);

module.exports = router;