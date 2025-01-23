import { createContext, use, useEffect } from 'react';
import {io} from 'socket.io-client';


const SocketContext = createContext();

const socket =  io(`${process.env.REACT_APP_API_URL}` , {
    transports: ['websocket'],
    autoConnect: false,
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: 10,
    reconnectionDelayMax: 5000,
    reconnectionDelayMin: 500,
    forceNew: true,
});

const  SocketProvider = ({children}) => {

    useEffect(() => {


        socket.connect();
        socket.on('connect', () => {
            console.log('Socket connected');
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        return () => {
            console.log('Socket disconnected');
            socket.disconnect();
        }

    }
    ,[])


    const sendMessage = (eventName , message) =>{
        socket.emit(eventName , message);

    }

    const recieveMessage = (eventName , callback) => {
        socket.on(eventName , callback);
    }


    return (
        <SocketContext.Provider value={{socket , sendMessage , recieveMessage}}>
            {children}
        </SocketContext.Provider>
    )
}

export {SocketContext, SocketProvider};