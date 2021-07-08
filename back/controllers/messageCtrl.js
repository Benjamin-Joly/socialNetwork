const mysql = require('mysql');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const db = mysql.createConnection({
    user:process.env.DBUSER,
    host:'localhost',
    password:process.env.DBPASSWORD,
    database:'gm__db'
});

exports.readMessage = async (req, res, next) => {
    try{
        db.query(`SELECT * FROM messages ORDER BY messageId DESC`, 
        (error, result) => {
            if(error){res.status(404).send(error.errno + '__' + error.sqlMessage)}
            else{
                res.status(200).send(result);
            }
        });
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
                db.query(`DELETE FROM messages WHERE messageId IN (${messages})`,
                    (error, result) => {
                        if(error){res.status(404).send(error.errno + '__' + error.sqlMessage)}
                        else{
                            res.status(200).send('Message(s) suppressed !');
                        }
                });
            }else{
                res.status(401).send('Accès refusé connectez-vous en Admin pour continuer');
            }
    }catch(error){
        res.status(500).send(error);
    }
}