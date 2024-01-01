const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const connectDB = require('./config/db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectDB();

// Use routes from the 'routes' directory
app.use('/', routes);

module.exports = app;