const mongoose = require('mongoose');



const SessionSchema = mongoose.Schema(

    {

        price: {
            type: Number,
            required: [true, "Price field is obligatory"]
        },
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
            required: [true, "Movie is obligatory"]
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            required: [true, "Room is obligatory"]
        },
        displayTime: {
            type: Date,
            required: [true, "Display time is obligatory"]
        },
        status: {
            type: String,
            enum: ['ongoing', 'completed', 'upcoming'],
            required: [true, "Please specify the session status"]
        },
        deleted_at: {
            type: Date,
            default: null,
        }
    }, {
        timestamps: true
    }

)
module.exports = mongoose.model('Session', SessionSchema);