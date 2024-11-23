const { Server } = require('socket.io');

const users={}
const io = new Server(3000, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});


io.on('connection', socket =>{
    socket.on('new-user', (name)=>{
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })

   socket.on('send-chat-message', (message)=>{
    socket.broadcast.emit('chat-message', {message:message, name:users[socket.id]})
   })


   socket.on('disconnect', ()=>{
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
   })
   
})



