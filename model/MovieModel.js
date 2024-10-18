const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Name field is obligatory"]
    },
    trailer: {
        type: String,
        required: [true, "trailer field is obligatory"]
    },
    image: {
        type: String,
        required: [true, "Movie Image is obligatory"]
    },
    video: {
        type: String,
        required: [true, "Movie video is obligatory"]
    },
    duration: {
        type: Number,
        required: [true, "Duration field is obligatory"],
        min: [30, "Duration must be at least 30 minutes"]
    },
    description: {
        type: String,
        required: [true, "Description field is obligatory"]
    },
    deleted_at: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('Movie', MovieSchema);