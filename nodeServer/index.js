// Node server which will handle socket io connections
const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined' , name =>{
        users[socket.id] = name;    //its joine user by name 
        socket.broadcast.emit('user-joined' , name)   //its intimate or send message to other users (someone join)
    });

    socket.on('send' , message =>{
        socket.broadcast.emit('receive' , {message: message , name: users[socket.id]})
    });

    socket.on('disconnect' , message =>{
        socket.broadcast.emit('left' , users[socket.id])
        delete users[socket.id];    
    });
    
})


