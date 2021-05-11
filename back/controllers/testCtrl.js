const mysql = require('mysql');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
dotenv.config();


exports.createPost = async (req, res, next) => {
    try{
        res.status(201).send('post left :)');
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
        const userId = decodedToken.userId;
        console.log(userId);
    }catch(error){
        res.status(400).send(error);
    }
}