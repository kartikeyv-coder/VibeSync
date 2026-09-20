const express = require('express');
const http = require('http');
const socketio = require('socket.io')

const { addUser, removeUser, getUser, getUserInRoom } = require('./user.js');

const port = process.env.PORT || 8000;

const router = require('./router');
// const { text } = require('stream/consumers');

//STEP-1 CREATE A APP FOR THE EXPRESS
const app = express();

// STEP-2 CREATING A SERVER A FROM THE HTTPS
const server = http.createServer(app);

// STEP-3 CREATING A INSTANCE FROM THE SERVER
const io = socketio(server, {
    cors: {
        origin: '*', // Allows connections from any frontend origin (or use 'http://localhost:5173')
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('we have  a new Connection ')

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);

        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        // admin generator 
        // means someone joined 
        /**
         * user: 'admin'
         * 
         * means "the user who sent this message is admin"
         */
        socket.emit('message', {
            user: 'admin',
            text: `${user.name},welcome to the room ${user.room}`
        })

        //this is will broadcast a message everyone except that user in the room
        socket.broadcast.to(user.room).emit('message', {
            user: 'admin',
            text: `${user.name},has joined!`
        })

        socket.join(user.room);

        io.to(user.room).emit('roomData', {
            room: user.room,
            user: getUserInRoom(user.room)
        })

        callback();
    })

    /**
     * User Generated message
     * 
     */

    socket.on('sendMessage', (message, callback) => {
        console.log('Message received from frontend:', message);

        const user = getUser(socket.id);

        console.log('User found:', user);

        if (!user) {
            console.log('User not found for socket:', socket.id);
            return callback('User not found');
        }

        console.log('Sending message to room:', user.room);

        io.to(user.room).emit('message', {
            user: user.name,
            text: message
        });

        io.to(user.room).emit('roomData', {
            room: user.room,
            user: getUserInRoom(user.room)
        });

        callback();
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', {
                user: 'admin',
                text: `${user.name} has left.`
            })
        }
    })
})

app.use(router);

server.listen(port, () => console.log(`Server has Started on port ${port}`));

/**
 * 
 * use callback function in simple words it means call me when your work is done
 * 
 */