const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
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
    const {body} = req.body;
    const { fieldname, originalname, encoding, mimetype, destination, filename } = req.file;
    const fileData = fs.readFileSync(__dirname + "/../img/" + filename);
    
    //const test = fs.readFileSync(__dirname + "/../img/" + filename);
    //console.log(test);
    //console.log(fieldname, originalname, encoding, mimetype, destination, filename);
    //console.log('file descr ', req.file);
    //console.log('user signed ', userId, username, position);
    
    db.query(`REPLACE INTO profilepic (fileData, fileName, fileAuthor, fileType) VALUES (?, ?, ?, ?)`, 
        [fileData, filename, userId, mimetype],
        (error, result) => {
            if(error){res.status(400).send(error.errno + '__' + error.sqlMessage)}
            else{ 
              res.status(201).send('file registered');
              fs.unlinkSync(__dirname + "/../img/" + filename);
            }
        });
    } catch (error) {
    res.status(400).send(error);
  }
}

exports.getFile = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
    const { userId, username, position } = decodedToken;
    const {body} = req.body;
    db.query(`SELECT * FROM profilepic WHERE fileAuthor =${userId}`, 
              (error, result) => {
                if(error){console.log(error)}
                else{
                  //console.log('result ', result);
                    //const data = buff.toString('base64');
                    //console.log(data);
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