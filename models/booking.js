const mongoose=require('mongoose')
const bookingSchema=mongoose.Schema({

    place:{
        type: String, required: true
    },
    placeid:{
        type: String, required: true
    },
   userid:{
        type: String, required: true
    },
    fromdate:{
        type: String, required: true
    },
    fromtime:{
        type: String, required: true
    },
    totalamount:{
        type: Number, required: true
    },
    transactionid:{
        type: String, required: true
    },
    status:{
        type: String, required: true, default:'booked'
    },

},{
    timestamps: true,
})
const bookingmodel=mongoose.model('bookings', bookingSchema)
module.exports=bookingmodel