const server = require('./http');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

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
        console.log('error Auth');
        socket.disconnect();
      }else{  
        db.query(`SELECT * FROM messages ORDER BY messageId DESC`, 
        (error, result) => {
          if(error){console.log(error)}
          else{
            socket.send(result);
          }
        });
        next();
      }
    });
  });
  
  //handshake & greetings
  io.on('connection', (socket) => {
    socket.send(`${socket.handshake.query.user} ready to go`);
    console.log('connected');
    socket.on('disconnect', () => {
      console.log('disconnected');
    });
    socket.on('joinRoom', (data) => {
      console.log(data);
    });
    socket.on('leaveRoom', (data) => {
      console.log(data);
      socket.send(`${socket.handshake.query.user} has left the room`);
    });
  });

  //New message event
  io.on('connection', (socket) => {
    socket.on('newMessage', (message) => {

      const {messageBody, userId, username, position} = message;
      let date = Date();
        date = date.toString();
        const isUp = false;

      db.query(`INSERT INTO messages (messageBody, messageAuthor, messageAuthorName, messageAuthorPosition, messageDate, isUp) VALUES (?, ?, ?, ?, ?, ?)`, 
      [messageBody, userId, username, position, date, isUp],
      (error, result) => {
          if(error){socket.send(error)}
      db.query(`SELECT * FROM messages ORDER BY messageId DESC`, 
      (error, result) => {
        if(error){console.log(error)}
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
      const { messageBody, userId, username, position, messageGifId, gifUrl } = gif;
      console.log(messageBody, userId, username, position, messageGifId, gifUrl);
      let date = Date();
      date = date.toString();
      const isUp = false;
      db.query(`INSERT INTO messages (messageBody, messageAuthor, messageAuthorName, messageAuthorPosition, messageDate, isUp, messageGifId, gifUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
      [messageBody, userId, username, position, date, isUp, messageGifId, gifUrl],
      (error, result) => {
          if(error){socket.send(error)}
          console.log(result);
      db.query(`SELECT * FROM messages ORDER BY messageId DESC`, 
      (error, result) => {
        if(error){console.log(error)}
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
        if(error){console.log('couldn\'t delete')};
    });
    db.query(`SELECT * FROM messages ORDER BY messageId DESC`, 
    (error, result) => {
      if(error){console.log(error)}
      else{
        io.send(result);
      }
    });
  })
})

//Update event
io.on('connection', (socket) => {
  socket.on('update', (message) => {
    console.log('update ', message);
    const messBody = message.messageBody;
    console.log(messBody);
    const messId = message.btnId;
    db.query(`UPDATE messages SET messageBody = "${messBody}" WHERE messageId = ${messId}`,
        (error, result) => {
            if(error){socket.send(error)};
        });
    db.query(`SELECT * FROM messages ORDER BY messageId DESC`, 
    (error, result) => {
        if(error){console.log(error)}
        else{
          io.send(result);
        }
    });
  })
})

//Error handle
  io.on('error', (socket) => {
    console.log('error occurred');
  });

  module.exports = io;



