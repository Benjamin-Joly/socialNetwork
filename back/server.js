const http = require('http');
const express = require('express');
const fs = require('fs');
const app = require('./app');

const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);



// we will pass our 'app' to 'https' server
server.listen(process.env.PORT || 3000);