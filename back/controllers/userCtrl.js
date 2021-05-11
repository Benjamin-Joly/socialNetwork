const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv.config();
 
const db = mysql.createConnection({
    user:process.env.DBUSER,
    host:'localhost',
    password:process.env.DBPASSWORD,
    database:'gm__db'
})

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

exports.createUser = async (req, res, next) => {
    try{
        const {firstName, lastName, email, position, password} = req.body;
        const salt = 10;
        const hash = await bcrypt.hash(password, salt);
        if(!hash){console.log('smth went wrong')};
        if(alphaNumValidation(firstName) && alphaNumValidation(lastName) && emailValidation(email)){
            db.query(`INSERT INTO usermodel (firstName, lastName, email, position, password) VALUES (?, ?, ?, ?, ?)`, 
            [firstName, lastName, email, position, hash],
            (error, result) => {
                if(error){res.status(400).send(error.errno + '__' + error.sqlMessage)}
                else{res.status(200).send('Values inserted')}
            });
         } else{
             res.status(400).send('unvalid field');
         }
    }catch(error){
        res.status(500).send('smth went wrong when signup ' + error)
    }   
};

exports.loginUser = (req, res, next) => {
    try{
        const {email, password} = req.body;
        if(email.length >= 1 && password.length >=1 && emailValidation(email)){
            const user = db.query(`SELECT * FROM usermodel WHERE email IN (?)`,
            email,
            async (error, result) => {
                if (error) { console.log('Smth went wrong when querying DB ' + error); }

                const userLogs = result[0];

                if (!userLogs) { res.status(404).send('no user with that name :('); }
                else {
                    const validLogs = await bcrypt.compare(password, userLogs.password);
                    if (!validLogs) { 
                        res.status(401).send('no can do baby doll'); 
                    }else{
                        const userId = userLogs.userId;
                        const token = jwt.sign(
                            { userId: userId },
                            process.env.TOKENSECRET,
                            { expiresIn: '2h' }
                        )
                        //res.header('Authorization', token).json({userId, token}).status(200).send('match !');
                        res.status(200).header('Authorization', token).send('match' + '__' + userId + '__' + token);
                    }       
                }
            });
        }else{
            res.status(400).send('fields must be correctly filled');
        }
        
    }catch(error){
        res.status(500).send('somth went wrong when login :s ' + error);
    }
}