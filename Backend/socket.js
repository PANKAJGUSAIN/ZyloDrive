const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io ;

// initialize socket
module.exports.initializeSocket = (server) =>{

    io = socketIo(server , {
        cors: {
            origin: ['https://pankajgusain.github.io' ,'http://localhost:3001'],
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected' , socket.id);

        // join event to update the socket id of user or captain
        socket.on('join' , async (data) => {
            console.log('join event' , data);
            const { userId , userType } = data;

            // check if person joined is user or captain and update the socket id
            if (userType === 'user'){
                const user = await userModel.findById(userId);
                if(user){
                    user.socketId = socket.id;
                    const result = await user.save();
                    console.log('user updated' , result);
                }
            }
            else if (userType === 'captain'){
                const captain = await captainModel.findById(userId);
                if(captain){
                    captain.socketId = socket.id;
                    await captain.save();
                }
            }
        }); 

        // disconnect event
        socket.on('disconnect', () => {
            console.log('user disconnected' , socket.id);
        });
    });

}

// send message to connected client
module.exports.sendMessageToSocketId = (socketId , message) =>{ 
    if(!io){
        return new Error('Socket is not initialized');
    }   
    else{
        io.to(socketId).emit('message', message);
    }
    
}
