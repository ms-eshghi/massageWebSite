const mongoose = require('mongoose');

const { model } = require('../db');
const placeSchema=new mongoose.Schema({
  name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true 
    },
        price:{
        type:Number,
        required:true
    },
imageurl:[],
currentbookings:[],
description:{
    type:String,
    required:true 
}
},{
    timestamps:true,
})
const placeModel=mongoose.model('place',placeSchema);
module.exports=placeModel;