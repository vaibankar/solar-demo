const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT, MONGO_URI } = require('./config');
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', dataRoutes);

app.get('/', (req, res) => res.json({ message: 'Solar backend up' }));

mongoose.connect(MONGO_URI).then(() => {
  console.log('Mongo connected');
  app.listen(PORT, () => console.log('Server running on', PORT));
}).catch(err => { console.error('Mongo error', err); process.exit(1); });
