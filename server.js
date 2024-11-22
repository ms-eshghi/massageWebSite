
const express = require('express');


const app=express();



const dbConfig= require('./db')
const placesRoute=require('./routes/placesRoute')


app.use('/api/places', placesRoute);
app.use(express.json());

const port=process.env.PORT ||5000;


app.listen(port, ()=>console.log(`Node server started on port ${port}`));