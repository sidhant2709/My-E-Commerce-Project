const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const errorMiddleware = require("./middlewares/errors")

app.use(express.json());
app.use(cookieParser());

// IMPORT ALL ROUTES
const products = require("./routes/products");
const auth = require('./routes/auth');

app.use('/api/v1', products);
app.use('/api/v1', auth);

//Middleware to handle errors
app.use(errorMiddleware)

module.exports = app;