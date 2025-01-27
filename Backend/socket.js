const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io ;

// initialize socket
const initializeSocket = (server) =>{

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
                    const result = await captain.save();
                    console.log('captain updated' , result);
                }
            }
        }); 

        // to update captain location
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if( !location || !location.ltd || !location.lng){
                return new Error('Location is required');
            }
            
            const captain = await captainModel.findById(userId);
            if (captain) {
                captain.location = {ltd: location.ltd, lng: location.lng};
                const result = await captain.save();
                console.log('captain location updated');
            }
        });

        // disconnect event
        socket.on('disconnect', () => {
            console.log('user disconnected' , socket.id);
        });
    });

}

// send message to connected client
const sendMessageToSocketId = (socketId , messageObj) =>{ 
    if(!io){
        return new Error('Socket is not initialized');
    }   
    else{
        io.to(socketId).emit(messageObj.event , messageObj.data);
    }
    
}

module.exports  = { initializeSocket  ,  sendMessageToSocketId }
