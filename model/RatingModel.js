const mongoose = require('mongoose');



const RatingSchema = mongoose.Schema(

    {
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
            required: [true, "Movie is obligatory"]
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "Client is obligatory"]
        },
        rate: {
            type: Number,
            required: [true, "rate field is obligatory"],
            max: [5, "You can't give more then 5 stars"]
        },
        deleted_at: {
            type: Date,
            default: null,
        }
    }, {
        timestamps: true
    }
)
module.exports = mongoose.model('Rating', RatingSchema);