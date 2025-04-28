const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const app = express();
app.use(cors({
    origin: '*',
    credentials: true
  }));  
app.use(express.json());
app.use(cookieParser());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const creditRoutes = require('./routes/creditRoutes');
app.use('/api/credits', creditRoutes);

const feedRoutes = require('./routes/feedRoute');
app.use('/api', feedRoutes);

app.get('/', (req, res) => {
  res.send('Server is running...');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
