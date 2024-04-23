const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoute = require('./routes/users')
const bugdetRoute = require('./routes/budget')

const app = express();
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// Routes
app.get('/', (req, res) => {
  res.send('Welcome to My Note App');
});


app.use('/api/users', userRoute);
app.use('/api/budget', bugdetRoute);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
