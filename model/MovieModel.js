const mongoose = require('mongoose');



const MovieSchema = mongoose.Schema(

    {
        name: {
            type: String,
            unique: true,
            required : [true, "Name field is obligatory"]
        },
        duration: {
            type: Number,
            required: [true, "Duration field is obligatory"],
            min: [60 ,"Duration must be at least 60 minute"]
        },
        deleted_at: {
            type: Date, 
            default: null,
        }
    },{
        timestamps: true
    }
    
)   
module.exports = mongoose.model('Movie', MovieSchema);
