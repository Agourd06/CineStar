const mongoose = require('mongoose');



const reservationSchema = mongoose.Schema({
    seat: {
        type: Array,
        required: [true, 'Seat Number is required'],
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Client Id is obligatory']
    },
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: [true, 'session id is obligatory']
    },
    totalPrice: {
        type: Number, 
        required: [true,'Total price is obligatory']
    },
    deleted_at: {
        type: Date, 
        default: null,
    }

} , {
    timestamps: true
}
)
module.exports = mongoose.model('Reservation', reservationSchema)