const express = require('express');
const dotenv = require('dotenv');
const cookieParser=require('cookie-parser');
const connectDB = require('./config/db');
//Route files
const companies = require('./routes/companies');
const auth = require('./routes/auth');
const interviews =require('./routes/interviews');
const jobposition = require('./routes/jobposition');
const mongoSanitize=require('express-mongo-sanitize');
const helmet=require('helmet');
const {xss}=require('express-xss-sanitizer');
const rateLimit=require('express-rate-limit');
const hpp=require('hpp');
const cors=require('cors');
//Load env vars
dotenv.config({path:'./config/config.env'});
//Connecct to database
connectDB();

const app=express();

//add body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

//Prevent http param pollutions
app.use(hpp());

//Enable CORS
app.use(cors());

//Rate Limiting
const limiter=rateLimit({
    windowMs:10*60*1000,//10 mins
    max: 100
});
app.use(limiter);

//Mount routers
app.use('/api/v1/companies',companies);
app.use('/api/v1/interviews', interviews);
app.use('/api/v1/auth', auth);
app.use('/api/v1/positions', jobposition);

const PORT=process.env.PORT || 5000;
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1));
});