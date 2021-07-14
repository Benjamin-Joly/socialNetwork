const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const dotenv = require('dotenv');
const fs = require('fs');
const multer = require('multer');
dotenv.config();


const db = mysql.createConnection({
    user:process.env.DBUSER,
    host:'localhost',
    password:process.env.DBPASSWORD,
    database:'gm__db'
});

exports.uploadFile = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
    const { userId, username, position } = decodedToken;
    const { fieldname, originalname, encoding, mimetype, destination, filename } = req.file;
    const fileData = fs.readFileSync(__dirname + "/../img/" + filename);
    db.query(`REPLACE INTO profilepic (fileData, fileName, fileAuthor, fileType) VALUES (?, ?, ?, ?)`, 
        [fileData, filename, userId, mimetype],
        (error, result) => {
            if(error){res.status(400).send(error.errno + '__' + error.sqlMessage)}
            else{ 
              res.status(201).send('file registered');
            }
            fs.unlinkSync(__dirname + "/../img/" + filename);
        });
    } catch (error) {
    res.status(400).send('error ?', error);
  }
}

exports.getFile = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
    const { userId, username, position } = decodedToken;
    db.query(`SELECT * FROM profilepic WHERE fileAuthor =${userId}`, 
              (error, result) => {
                if(error){console.error(error)}
                else{
                    res.status(200).send({
                      message : 'file found',
                      file : result[0]
                    });
                }
            });
  } catch (error) {
    res.status(400).send(error);
  }
}