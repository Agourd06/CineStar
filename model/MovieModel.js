const mongoose = require('mongoose');



const MovieSchema = mongoose.Schema(

    {
        name: {
            type: String,
            unique: true,
            required: [true, "Name field is obligatory"]
        },
        autor: {
            type: String,
            required: [true, "autor field is obligatory"]
        },
        trailer: {
            type: String,
            required: [true, "autor field is obligatory"]
        },
        media: {
            type: String,
            required: [true, "Movie Image is obligatory"]
        },
        duration: {
            type: Number,
            required: [true, "Duration field is obligatory"],
            min: [30, "Duration must be at least 60 minute"]
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
    }

)
module.exports = mongoose.model('Movie', MovieSchema);