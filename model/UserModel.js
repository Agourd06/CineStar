const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema(

    {
        name: {
            type: String,
            required: [true, "Name field is obligatory"]
        },
        email: {
            type: String,
            required: [true, "E-mail field is obligatory"],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "password field is obligatory"],
            minlength: [6, "Password must be at least 6 characters long"]
        },
        role: {
            type: String,
            enum: ['admin', 'client'],
            required: [true, "role field is obligatory"],
        },
        subscribed : {
            type: Boolean,
            default: false
        },
        deleted_at: {
            type: Date, 
            default: null,
        }
    }, {
        timestamps: true
    });
    userSchema.pre('save', async function (next) {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    });
    
    module.exports = mongoose.model('User', userSchema);
