const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
 
const app = express();
dotenv.config();

app.use(express.json());
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(()=> console.log("✔️ Connection Successful!"))
.catch((err)=> console.error("❌ Failed!",err) )


const io = new Server(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
})


// Socket handling
io.on('connection',(socket)=>{
    console.log("✔️ User Connected",socket.id);
    socket.on('send-message',(data)=>{
        console.log("message-received",data);
        io.emit('received-message',data);
    })
    socket.on('disconnect',()=>{
        console.log("❌ User Disconnected",socket.id);
    })
})



app.get('/',(req,res)=>{
    return res.send({message:"Welcome To Server!"});
})


server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})