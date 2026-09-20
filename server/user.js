const users = []; 
 
const addUser = ({ id, name, room }) => { 
//JavaScript Mastery => javascriptmastery 
    name = name.trim().toLowerCase(); 
    room = room.trim().toLowerCase(); 
 
    const existingUser = users.find( 
        (user) => user.room === room && user.name === name 
    ); 
 
    if (existingUser) { 
        return { error: 'Username is taken' }; 
    } 
 
    const newUser = { id, name, room }; 
 
    users.push(newUser); 
 
    return { user: newUser }; 
}; 
 
const removeUser = (id) => { 
 
    const index = users.findIndex((user) => user.id === id); 
 
    if (index !== -1) { 
        return users.splice(index, 1)[0]; 
    } 
}; 
 
const getUser = (id) => { 
    return users.find((user) => user.id === id); 
}; 
 
const getUserInRoom = (room) => { 
    return users.filter((user) => user.room === room); 
}; 
 
module.exports = { 
    addUser, 
    removeUser, 
    getUser, 
    getUserInRoom 
};