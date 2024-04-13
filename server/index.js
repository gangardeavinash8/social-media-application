 const express = require('express');
const dotenv=require('dotenv')
dotenv.config('./.env');
const dbConnect=require('./dbConnect')
const authRouter=require('./routers/authRouter')
const postRouter=require('./routers/postRouter')
const morgan=require('morgan')
const cookieParser=require('cookie-parser')
const cors=require('cors')

const app=express();

//middleware

app.use(express.json());
app.use(morgan("common"));
app.use(cookieParser());
app.use(cors({
    credentials:true,
     origin:'http://localhost:3000'
}));


app.use('/auth',authRouter);//for login and singin 
app.use('/post',postRouter);// this is only for already logged in users
app.get('/',(req,res)=>{
    res.status(200).send(); 
    

})

dbConnect()
 const PORT=process.env.PORT || 4001 ;  
 app.listen(PORT,()=>{
    console.log(`Listening  on port ${PORT}`);
 })
