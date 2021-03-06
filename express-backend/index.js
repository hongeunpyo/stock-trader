const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const SignIn = require('./handlers/SignIn');
const Register = require('./handlers/Register');
const Search = require('./handlers/Search');
const Buy = require('./handlers/Buy');
const Portfolio = require('./handlers/Portfolio');
const Transactions = require('./handlers/Transactions');
const { authenticateJWT } = require('./middleware/authMiddleware');

require('dotenv').config();

const app = express();
const port = 8000;
const mongoUrl = process.env.MONGO_API_URL;

app.use(cors())
app.use(bodyParser.json());

mongoose.connect(mongoUrl, { useNewUrlParser: true , useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => console.log('Connected to mongoDB instance'));
connection.on('error', (err) => {
    console.log("Could not connect to mongoDB" + err);
    process.exit();
});

app.get('/test', authenticateJWT, (req, res) => res.send('GET: test!'))
// Publicly accessible routes
app.post('/signin', SignIn);
app.post('/register', Register);
// Authenticated routes
app.post('/search', authenticateJWT, Search);
app.post('/buy', authenticateJWT, Buy);
app.post('/portfolio', authenticateJWT, Portfolio);
app.post('/transactions', authenticateJWT, Transactions);


app.listen(port, () => console.log(`Server started on port :${port}!`))
