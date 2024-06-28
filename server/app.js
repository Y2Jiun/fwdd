// server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const dbConnection = require('./db.js');


const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000' // Replace with your client URL
}));

// Routes
// app.use('/routes/user', userRoutes);
app.use('/user', userRoutes); // Mounting userRoutes without /routes prefix

app.get('/', (req, res) => {    
    res.send('Hello, this is the root!');
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
