const db = require('../config/db');

const getAgents = async (req, res) => {
  try {
    const [agents] = await db.query('SELECT * FROM agents ORDER BY created_at DESC');
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const createAgent = async (req, res) => {
  const { name, email, phone, status, location } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO agents (name, email, phone, status, location) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone || '', status || 'Active', location || '']
    );
    const [newAgent] = await db.query('SELECT * FROM agents WHERE id = ?', [result.insertId]);
    res.status(201).json(newAgent[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateAgent = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, status, location } = req.body;
  try {
    await db.query(
      'UPDATE agents SET name=?, email=?, phone=?, status=?, location=? WHERE id=?',
      [name, email, phone, status, location, id]
    );
    const [updated] = await db.query('SELECT * FROM agents WHERE id = ?', [id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteAgent = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM agents WHERE id = ?', [id]);
    res.json({ message: 'Agent deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getAgents, createAgent, updateAgent, deleteAgent };