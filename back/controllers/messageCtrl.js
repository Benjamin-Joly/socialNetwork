const mysql = require('mysql');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
dotenv.config();

const db = mysql.createConnection({
    user:process.env.DBUSER,
    host:'localhost',
    password:process.env.DBPASSWORD,
    database:'gm__db'
});

const alphaNumValidation = (field) => {
    if(field.length >= 3 && field.length <= 30 && /^[A-Za-zÀ-ÖØ-öø-ÿ0-9- ]*$/.test(field) === true){
        return field;
    }
};

const emailValidation = (field) => {
    if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(field) === true){
        return field;
    }
}

exports.createMessage = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
        const userId = decodedToken.userId;
        const {body} = req.body;
        let date = Date();
        date = date.toString();
        console.log(date);
        const isUp = 0;
        db.query(`INSERT INTO messages (messageBody, messageAuthor, messageDate, isUp) VALUES (?, ?, ?, ?)`, 
            [body, userId, date, isUp],
            (error, result) => {
                if(error){res.status(400).send(error.errno + '__' + error.sqlMessage)}
                else{res.status(201).send('message registered')}
            });
        //res.status(201).send('post left :)');
    }catch(error){
        res.status(400).send(error);
    }
};

exports.readMessage = async (req, res, next) => {
    try{
        db.query(`SELECT * FROM messages ORDER BY messageId DESC`, 
        (error, result) => {
            if(error){res.status(404).send(error.errno + '__' + error.sqlMessage)}
            else{
                console.log('help yourself ;)');
                res.status(200).send(result);
            }
        });
        //res.status(200).send('you can access the data');
    }catch(error){
        res.status(500).send('a problem pop up please try again later');
    }
};