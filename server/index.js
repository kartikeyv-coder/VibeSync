const express = require('express');
const http = require('http');
const socketio = require('socket.io')
const multer = require('multer')
const path = require('path')
const cors = require('cors');
const { addUser, removeUser, getUser, getUserInRoom } = require('./user.js');

const port = process.env.PORT || 8000;

const router = require('./router');
const { error, timeStamp } = require('console');
// const { text } = require('stream/consumers');

//STEP-1 CREATE A APP FOR THE EXPRESS
const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

// Make uploaded files accessible
app.use('/uploads', express.static('uploads'));

//STEP-1.1 UPDATING THE BACKENDED FOR UPLOADING THE FILES IN THE CHAT APP
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage });

//STEP-1.2 MAKE UPLOADED FILES ACCESSIBLE
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
     * Typing Indicator
     */
    socket.on('typing', (isTyping) => {
        const user = getUser(socket.id)

        if (!user) {
            return;
        }

        socket.broadcast.to(user.room).emit('typing', {
            user: user.name,
            isTyping
        })
    })



    /**
     * User Generated message
     * 
     */

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        if (!user) {
            return callback('User not found');
        }

        // Send message to everyone in the room
        if (typeof message === 'string') {

            io.to(user.room).emit('message', {
                user: user.name,
                text: message,
                timestamp: new Date().toISOString()
            });

        } else {

            io.to(user.room).emit('message', {
                user: user.name,
                type: message.type,
                filename: message.filename,
                url: message.url,
                timestamp: new Date().toISOString()
            });

        }
        if (callback) {

            callback();
        }
    });

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


//FILE UPLOAD ENDPOINT  
app.post('/upload', upload.single('file'), (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            error: 'No file Uploaded'
        });
    }

    console.log('File uploaded:', req.file);

    res.json({
        filename: req.file.originalname,
        url: `http://localhost:${port}/uploads/${req.file.filename}`
    })
})

app.use((err, req, res, next) => {
    console.error('UPLOAD ERROR:', err);

    res.status(500).json({
        error: err.message
    });
});

app.use(router);

server.listen(port, () => console.log(`Server has Started on port ${port}`));


/**
 * 
 * use callback function in simple words it means call me when your work is done
 * 
 */