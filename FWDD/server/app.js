// server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user.js');
const dbConnection = require('./db.js');


const app = express();

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('./routes/user', userRoutes);

app.get('/', (req, res) => {    
    res.send('Hello, this is the root!');
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
