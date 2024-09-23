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
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
        },
        password: {
            type: String,
            required: [true, "password field is obligatory"],
            minlength: [6, "Password must be at least 6 characters long"]
        },
        role: {
            type: String,
            required: [true, "role field is obligatory"],
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
