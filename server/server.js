const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(()=> console.log("✔️ Connection Successful!"))
.catch((err)=> console.error("❌ Failed!",err) )


app.get('/',(req,res)=>{
    return res.send({message:"Welcome To Server!"});
})


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})