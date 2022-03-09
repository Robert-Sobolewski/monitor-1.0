import http from 'http';
import express from 'express';
import 'dotenv/config'
import {Server, Socket} from 'socket.io';
const socketIo = require('socket.io');
const cors = require('cors');
const PORT = process.env.PORT ||4000


// create server instance

const app = express();
app.use(express.json({limit:'2mb'}))
app.use(cors())
const server = http.createServer(app);
const io = new Server(
    server,{
        cors:{
            origin: 'http://localhost:3000'
        }
    }
);

/*
data = {user: fullname, country:Object}
*/

io.on('connection',(socket:Socket) =>{
    console.log('new client connected');
    socket.on('toServer', (data:any)=>{
        console.log(`${data.user} from ${data.country?.name}`)
    })
    socket.once('connection',()=>{console.log('device connected')})

    socket.on('disconnect', ()=>console.log('client disconnected'))
})



server.listen(PORT,()=>console.log(`server listen on port ${PORT}`));



