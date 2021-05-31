const server = require('./http');
const express = require('express');
const fs = require('fs');
const io = require('./io');

// we will pass our 'app' to 'https' server
server.listen(process.env.PORT || 3000);
