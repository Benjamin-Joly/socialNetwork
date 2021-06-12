const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/messages');
const multerRoutes = require('./routes/multer');
const helmet = require("helmet");
const path = require('path');
const multer = require('multer');
dotenv.config();

app.use(express.json());

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/', userRoutes);
app.use('/messages/', messageRoutes);
app.use('/', multerRoutes);

module.exports = app;