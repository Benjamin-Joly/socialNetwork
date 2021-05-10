const mysql = require('mysql');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

const db = mysql.createConnection({
    user:'JenjaminBoly',
    host:'localhost',
    password:process.env.DBPASSWORD,
    database:'gm__db'
})

exports.createUser = async (req, res, next) => {
    try{
        const {firstName, lastName, email, position, password} = req.body;
        console.log(firstName, lastName, email, position, password);
        const salt = 10;
        const hash = await bcrypt.hash(password, salt);
        if(!hash){console.log('smth went wrong')};
        db.query(`INSERT INTO usermodel (firstName, lastName, email, position, password) VALUES (?, ?, ?, ?, ?)`, 
        [firstName, lastName, email, position, hash],
        (error, result) => {
            if(error){console.log(error)}
            else{res.status(200).send('Values inserted')}
        });
    }catch(error){
        res.status(500).send('smth went wrong when signup ' + error)
    }   
};

exports.loginUser = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        const user = db.query(`SELECT email, password FROM usermodel WHERE email IN (?)`,
            email,
            async (error, result) => {
                if (error) { console.log('Smth went wrong when querying DB ' + error); }
                const userLogs = result[0];
                if (!userLogs) { res.status(404).send('no user with that name :('); }
                else {
                    const validLogs = await bcrypt.compare(password, userLogs.password);
                    console.log(validLogs);
                    if (validLogs) { res.status(200).send('match !'); }
                    else { res.status(401).send('no can do baby doll'); }
                }
            });
    }catch(error){
        res.status(500).send('somth went wrong when login :s ' + error);
    }
}