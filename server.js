
var cors = require('cors')
const app = require("express")();
const httpServer = require("http").createServer(app);
const fs = require('fs');
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
httpServer.listen(8000);
const users = {} ;

io.on( 'connection' , socket => {

    socket.on('new-user-joined' , name =>
    {
        console.log('user' , name , socket.id  );
        users[socket.id] = name ;
        socket.broadcast.emit('user-joined' , name );
    })

    socket.on( 'send' , message => {
        socket.broadcast.emit( 'receive' , { message : message , name : users[socket.id ]});
    })
    
    //Transfering files 
    socket.on("myfile", ( file ) => {

      socket.broadcast.emit('receive_file', file  );
      });

    //Individual connections 
    socket.on('individual_chat', (id , message ) => {

      io.to(id).emit("message_huihui" , {message:"fuck you"});

      socket.emit('chat message' + id ) ;
    });


});

 
   
 