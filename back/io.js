const server = require('./http');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const multer = require('multer')

const db = mysql.createConnection({
  user:process.env.DBUSER,
  host:'localhost',
  password:process.env.DBPASSWORD,
  database:'gm__db'
});

const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"],
      allowedHeaders: ['Access-Control-Allow-Origin'],
    }
  });


  //Auth
  io.use( async (socket, next) => {
    const token = socket.handshake.auth.token;
    const decodedToken = jwt.verify(token, process.env.TOKENSECRET, (error) => {
      if(error){
        console.error('error Auth');
        socket.disconnect();
      }else{  
        db.query(`SELECT * FROM messages ORDER BY messageId DESC`, 
        (error, result) => {
          if(error){console.error(error)}
          else{
            socket.send(result);
          }
        });
        next();
      }
    });
  });

  //New message event
  io.on('connection', (socket) => {
    socket.on('newMessage', (message) => {
      const {messageBody, userId, username, position, profilePicData} = message;
      let date = Date();
      const dateFormat = date.split(' ');
      date = dateFormat[2] + ' ' + dateFormat[1] + ' ' + dateFormat[3];
      date = date.toString();
        const isUp = false;

      db.query(`INSERT INTO messages (messageBody, messageAuthor, messageAuthorName, messageAuthorPosition, messageDate, isUp, profilePicData) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
      [messageBody, userId, username, position, date, isUp, profilePicData],
      (error, result) => {
          if(error){socket.send(error)}
      db.query(`SELECT * FROM messages ORDER BY messageId DESC`, 
      (error, result) => {
        if(error){console.error(error)}
        else{
          io.send(result);
        }
      });
    });

    })
  })

  //Gif event
  io.on('connection', (socket) => {
    socket.on('newGif', (gif) => {
      const { messageBody, userId, username, position, messageGifId, gifUrl, profilePicData } = gif;
      let date = Date();
      const dateFormat = date.split(' ');
      date = dateFormat[2] + ' ' + dateFormat[1] + ' ' + dateFormat[3];
      date = date.toString();
      const isUp = false;
      db.query(`INSERT INTO messages (messageBody, messageAuthor, messageAuthorName, messageAuthorPosition, messageDate, isUp, messageGifId, gifUrl, profilePicData) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
      [messageBody, userId, username, position, date, isUp, messageGifId, gifUrl, profilePicData],
      (error, result) => {
          if(error){socket.send(error)}
      db.query(`SELECT * FROM messages ORDER BY messageId DESC`, 
      (error, result) => {
        if(error){console.error(error)}
        else{
          io.send(result);
        }
      });
    });
    })
  })

//delete event
io.on('connection', (socket) => {
  socket.on('delete', (message) => {
    const messId = message.btnId;
    db.query(`DELETE FROM messages WHERE messageId = ${messId}`,
    (error) => {
        if(error){console.error('couldn\'t delete')};
    });
    db.query(`SELECT * FROM messages ORDER BY messageId DESC`, 
    (error, result) => {
      if(error){console.error(error)}
      else{
        io.send(result);
      }
    });
  })
})

//Update event
io.on('connection', (socket) => {
  socket.on('update', (message) => {
    const messBody = message.messageBody;
    const messId = message.btnId;
    db.query(`UPDATE messages SET messageBody = "${messBody}" WHERE messageId = ${messId}`,
        (error, result) => {
            if(error){socket.send(error)};
        });
    db.query(`SELECT * FROM messages ORDER BY messageId DESC`, 
    (error, result) => {
        if(error){console.error(error)}
        else{
          io.send(result);
        }
    });
  })
});

//img Update event

io.on('connection', (socket) => {
  socket.on('imgUpdate', (image) => {
    const imageData = image.fileData;
    const userId = image.author;
    db.query(`UPDATE messages SET profilePicData = "${imageData}" WHERE messageAuthor = ${userId}`,
        (error, result) => {
          console.log('test result handling', result);
            if(error){
              console.log('test error handling', error, result);
              socket.send(error);
            };
        });
    db.query(`SELECT * FROM messages ORDER BY messageId DESC`, 
    (error, result) => {
        if(error){console.error(error)}
        else{
          io.send(result);
        }
    });
  })
});

io.on('connection', (socket) => {
  socket.on('userUpdate', (author) => {
    db.query(`UPDATE messages SET messageAuthorName = "${author.username}", messageAuthorPosition = "${author.position}" WHERE messageAuthor = ${author.userId}`,
        (error, result) => {
            if(error){socket.send(error)};
            if(result){console.log('updated')}
        });
    db.query(`SELECT * FROM messages ORDER BY messageId DESC`, 
    (error, result) => {
        if(error){console.error(error)}
        else{
          io.send(result);
        }
    });
  })
});


//Error handle
  io.on('error', (socket) => {
    console.error('error occurred');
  });

  module.exports = io;



