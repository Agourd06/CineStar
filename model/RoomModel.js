const mongoose = require('mongoose');


const roomSchema = mongoose.Schema({
   name: {
    type: String,
    required : [true,'Room Name is required'],
    unique: true
        
    },
    capacity : {
        type : Number,
        required : [true , "Romm capacity is required"],
        min : [6 , "Room capacity can't be below 6 seats"]
    },
    row_seats:{
        type:Number,
        required:[true,"Seats per each row is obligatory"]
    },
    room_type : {
        type: String,
        enum: ['VIP', 'Normal'], 
        required: [true, "can you add a room type"]
    },
    deleted_at: {
        type: Date, 
        default: null,
    }
} , {
    timestamps: true
}
)
module.exports = mongoose.model('Room', roomSchema);