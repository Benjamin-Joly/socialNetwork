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

exports.createUser = async (req, res, next) => {
    try{
        const {firstName, lastName, email, position, password} = req.body;
        const salt = 10;
        const hash = await bcrypt.hash(password, salt);
        if(!hash){console.error('smth went wrong with pw #')};
        if(alphaNumValidation(firstName) && alphaNumValidation(lastName) && emailValidation(email)){
            db.query(`INSERT INTO users (firstName, lastName, email, position, password) VALUES (?, ?, ?, ?, ?)`, 
            [firstName, lastName, email, position, hash],
            (error, result) => {
                if(error){res.status(400).send({
                   message : error.errno + '--' + error.sqlMessage,
                   valid : false
                })}
                else{res.status(200).send({
                    message : `utilisateur ${firstName+' '+lastName} créé`,
                    valid : true
                })}
            });
         } else{
             res.status(400).send({
                message : 'Entrée(s) invalide(s) veillez à renseigner un email valide et de n\'utiliser que des caractères alphanumériques',
                valid : false
            });
         }
    }catch(error){
        res.status(500).send({
            message : 'smth went wrong when signup ' + error,
            valid : false
        })
    }   
};

exports.loginUser = (req, res, next) => {
    try{ 
        const {email, password} = req.body;
        if(email.length >= 1 && password.length >=1 && emailValidation(email)){
            const user = db.query(`SELECT * FROM users WHERE email IN (?)`,
            email,
            async (error, result) => {
                if (error) { console.log('Smth went wrong when querying DB ' + error); }

                const userLogs = result[0];

                if (!userLogs) { res.status(404).send({
                    message : 'Informations erronées',
                    valid : false
                }); 
                } else {
                    const validLogs = await bcrypt.compare(password, userLogs.password);
                    if (!validLogs) { 
                        res.status(401).header('response', false).send({
                            message : 'Informations erronées',
                            valid : false
                        }); 
                    }else{
                        const userId = userLogs.userId;
                        const token = jwt.sign(
                            {userId: userId,
                            username : userLogs.firstName + ' ' + userLogs.lastName,
                            position : userLogs.position,
                            valid : true
                            },
                            process.env.TOKENSECRET,
                            { expiresIn: '2h' }
                        );
                        db.query(`SELECT * FROM profilepic WHERE fileAuthor =${userId}`, 
                            (error, result) => {
                            if(error){console.error(error)}
                            else{
                                const file = result[0];
                                res.status(200).header('Authorization', token).send({
                                    session : token,
                                    user : {                           
                                         userId : userId,
                                         username: userLogs.firstName + ' ' + userLogs.lastName,
                                         email : userLogs.email,
                                         position: userLogs.position,
                                         description : userLogs.description,
                                         imgUrl : userLogs.imgUrl
                                     },
                                     file : file,
                                     valid : true
                                 });
                            }
                        });
                    }       
                }
            });
        }else{
            res.status(400).send({
                message : 'Des champs ne sont pas renseignés',
                valid : false
            });
        }
        
    }catch(error){
        res.status(500).send({
            message : 'somth went wrong when login :s ' + error,
            valid : false
        });
    }
}

exports.loginAdmin = (req, res, next) => {
    try{ 
        const {email, password} = req.body;
        if(email.length >= 1 && password.length >=1 && emailValidation(email)){
            const admin = db.query(`SELECT * FROM adminaccounts WHERE email IN (?)`,
            email,
            async (error, result) => {
                if (error) { console.error('Smth went wrong when querying DB ' + error); }

                const userLogs = result[0];

                if (!userLogs) { res.status(404).send({
                    message : 'Informations erronées',
                    valid : false,
                    admin : false
                }); 
                } else {
                    const validLogs = await bcrypt.compare(password, userLogs.password);
                    if (!validLogs) { 
                        res.status(401).header('response', false).send({
                            message : 'Informations erronées',
                            valid : false,
                            admin : false
                        }); 
                    }else{
                        const userId = userLogs.userId;
                        const token = jwt.sign(
                            {userId: userLogs.idAdmins,
                            username : userLogs.firstName + ' ' + userLogs.lastName,
                            position : userLogs.position,
                            valid : true, 
                            admin : true
                            },
                            process.env.TOKENSECRET,
                            { expiresIn: '2h' }
                        );
                        res.status(200).header('Authorization', token).send({
                           session : token,
                           user : {                           
                                userId : userId,
                                username: userLogs.firstName + ' ' + userLogs.lastName,
                                email : userLogs.email,
                                position: userLogs.position,
                                description : userLogs.description,
                                imgUrl : userLogs.imgUrl
                            },
                            valid : true,
                            admin : true
                        });
                    }       
                }
            });
        }else{
            res.status(400).send({
                message : 'Des champs ne sont pas renseignés',
                valid : false,
                admin :false
            });
        }
        
    }catch(error){
        res.status(500).send({
            message : 'somth went wrong when login :s ' + error,
            valid : false
        });
    }
}

exports.validSession = (req, res, next) => {
    //tool for auth debug;
    if(res){
        res.status(200).send(true);
        next();
    }else{
        res.status(404).send('Session invalide');
    }
}


exports.getOneUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
        const userId = decodedToken.userId;
            const user = db.query(`SELECT * FROM users WHERE userId IN (?)`,
            userId,
            (err, result) => {
                if (err) { console.log('Smth went wrong when querying DB ' + error); }
                    const userDatas = result[0];
                    const { userId, firstName, lastName, email, position, hash, description } = userDatas
                    res.status(200).send([userId, firstName, lastName, email, position, description]);
            });
      } catch {
        res.status(401).send('Accès refusé connectez-vous pour continuer');
      }
}

exports.getUsers = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
            const user = db.query(`SELECT * FROM users`,
            (err, result) => {
                if (err) { console.error('Smth went wrong when querying DB ' + error); }
                    res.status(200).send(result);
            });
      } catch {
        res.status(401).send('Accès refusé connectez-vous en Admin pour continuer');
      }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
        const userId = decodedToken.userId;
        const admin = decodedToken.admin;
            if(admin === true){
                const user = req.body.user;
                db.query(`DELETE FROM users WHERE userId IN (${user})`,
                    (error, result) => {
                        if(error){res.status(404).send(error.errno + '__' + error.sqlMessage)}
                        else{
                            res.status(200).send('User(s) suppressed !');
                        }
                });
            }else{
                res.status(401).send('Accès refusé connectez-vous en Admin pour continuer');
            }
            
      } catch {
        res.status(401).send('Accès refusé connectez-vous en Admin pour continuer');
      }
};

exports.deleteSelf = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
                db.query(`DELETE FROM users WHERE userId IN (${decodedToken.userId})`,
                    (error, result) => {
                        if(error){res.status(404).send(error.errno + '__' + error.sqlMessage)}
                        else{
                            res.status(200).send({
                                message : 'User(s) suppressed !',
                                valid : true
                            });
                        }
                });
            } catch {
        res.status(401).send('Acces refusé connectez-vous pour continuer');
      }
};

exports.updateSelf = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.TOKENSECRET);
        const data = req.body;
        let { firstName, lastName, userId, position } = data;
        firstName ? console.log('fN defined') : firstName = decodedToken.username.split(' ')[0];
        lastName ? console.log('lastName defined') : lastName = decodedToken.username.split(' ')[1];
        userId ? console.log('userId defined') : userId = decodedToken.userId;
        if(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9- ]*$/.test(firstName) && /^[A-Za-zÀ-ÖØ-öø-ÿ0-9- ]*$/.test(lastName) && /^[A-Za-zÀ-ÖØ-öø-ÿ0-9- ]*$/.test(position)){
            db.query(`UPDATE users SET firstName = "${firstName}", lastName = "${lastName}", position="${position}" WHERE userId = ${userId}`,
            (error, result) => {
                if(error){res.status(404).send(error.errno + '__' + error.sqlMessage)}
                else{
                    db.query(`SELECT * FROM users WHERE userId IN (?)`,
                userId,
                (err, result) => {
                    if (err) { console.error('Smth went wrong when querying DB ' + error); }
                        const userDatas = result[0];
                        const { userId, firstName, lastName, email, position, hash, description } = userDatas
                        
                        res.status(200).send([userId, firstName, lastName, email, position, description]);
                });
                }
            });
        }else{
            db.query(`SELECT * FROM users WHERE userId IN (?)`,
                userId,
                (err, result) => {
                    if (err) { console.error('Smth went wrong when querying DB ' + error); }
                        const userDatas = result[0];
                        const { userId, firstName, lastName, email, position, hash, description } = userDatas
                        
                        res.status(200).send([userId, firstName, lastName, email, position, description]);
                });
        }  
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}