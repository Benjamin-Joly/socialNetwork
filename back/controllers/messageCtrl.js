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
    if(field.length >= 3 && field.length <= 30 && /^[A-Za-zÀ-ÖØ-öø-ÿ0-9-'- ]*$/.test(field) === true){
        return field;
    }
};

const preventReservedChar = (field) => {
    if(field.length >= 3 && field.length <= 300 && /+*?^$\.[]{}()|/.test(field) === false){
        console.log('good '+ field.length +'__' + /+*?^$\.[]{}()|/.test(field));
    }
    else{
        console.log('bad '+ field.length +'__' + /+*?^$\.[]{}()|/.test(field));
    }
}

exports.createMessage = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
        const { userId, username, position } = decodedToken;
        const {body} = req.body;
        let date = Date();
        date = date.toString();
        const isUp = 0;
        db.query(`INSERT INTO messages (messageBody, messageAuthor, messageAuthorName, messageAuthorPosition, messageDate, isUp) VALUES (?, ?, ?, ?, ?, ?)`, 
        [body, userId, username, position, date, isUp],
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
                res.status(200).send(result);
            }
        });
        //res.status(200).send('you can access the data');
    }catch(error){
        res.status(500).send('a problem showed up please try again later');
    }
};

exports.deleteMessage = async (req, res, next) => {
    try{
        const messId = req.body.messageId;
        db.query(`DELETE FROM messages WHERE messageId = ${messId}`,
        (error, result) => {
            if(error){res.status(404).send(error.errno + '__' + error.sqlMessage)}
            else{
                res.status(200).send('Message suppressed !');
            }
        });
    }catch(error){
        res.status(500).send(error);
    }
}

exports.updateMessage = async (req, res, next) => {
    try{
        const messId = req.body.messageId;
        const messBody = req.body.messageBody;
        db.query(`UPDATE messages SET messageBody = "${messBody}" WHERE messageId = ${messId}`,
        (error, result) => {
            if(error){res.status(404).send(error.errno + '__' + error.sqlMessage)}
            else{
                res.status(200).send(true);
            }
        });
    }catch(error){
        res.status(500).send(error);
    }
}


exports.deleteMessages = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
        const admin = decodedToken.admin;
            if(admin === true){
                const messages = req.body.messages;
                console.log('mess ',messages);
                db.query(`DELETE FROM messages WHERE messageId IN (${messages})`,
                    (error, result) => {
                        if(error){res.status(404).send(error.errno + '__' + error.sqlMessage)}
                        else{
                            res.status(200).send('Message(s) suppressed !');
                        }
                });
            }else{
                res.status(401).send('Access denied, ask for admin rights to continue');
            }
    }catch(error){
        res.status(500).send(error);
    }
}