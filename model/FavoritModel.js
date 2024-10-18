const mongoose = require('mongoose');



const FavoritSchema = mongoose.Schema(

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
        deleted_at: {
            type: Date,
            default: null,
        }
    }, {
        timestamps: true
    }
)
module.exports = mongoose.model('Favorit', FavoritSchema);