const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
//Route files
const companies = require('./routes/companies');
const auth = require('./routes/auth');
//Load env vars
dotenv.config({path:'./config/config.env'});
//Connecct to database
connectDB();

const app=express();

//add body parser
app.use(express.json());

//Mount routers
app.use('/api/v1/companies',companies);
app.use('/api/v1/auth', auth);

const PORT=process.env.PORT || 5000;
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1));
});