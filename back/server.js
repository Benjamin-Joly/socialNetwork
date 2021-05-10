const http = require('http');
const express = require('express');
const fs = require('fs');
const app = require('./app');


// we will pass our 'app' to 'https' server
http.createServer(app).listen(process.env.PORT || 3000);