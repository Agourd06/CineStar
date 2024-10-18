const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
   content: {
    type: String,
    required : [true,'comment content is required'],        
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Client Id is obligatory']
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: [true, 'Movie Id is obligatory']
    },
    deleted_at: {
        type: Date, 
        default: null,
    }
} , {
    timestamps: true
}
)
module.exports = mongoose.model('comment', commentSchema);