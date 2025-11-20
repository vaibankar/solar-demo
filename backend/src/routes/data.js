const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// sample endpoints for tabs
router.get('/profile', auth, async (req, res) => {
  // return some profile + themes info
  res.json({ name: req.user.email, themes: ['sunrise','noon','sunset','night'] });
});

router.get('/solar/kw', auth, async (req, res) => {
  // sample generated data
  res.json({ kw: 5.2, capacity: 6.0 });
});

router.get('/solar/plates', auth, async (req, res) => {
  res.json({ plates: [ { id: 1, model: 'SP-100', capacity: 300 }, { id: 2, model: 'SP-200', capacity: 350 } ] });
});

router.get('/solar/units', auth, async (req, res) => {
  const units = [];
  for (let i = 0; i < 7; i++) units.push({ date: `2025-11-${10+i}`, kWh: (3 + Math.random()*4).toFixed(2) });
  res.json({ units });
});

router.get('/billing', auth, async (req, res) => {
  res.json({ due: 250.5, currency: 'INR' });
});

module.exports = router;
