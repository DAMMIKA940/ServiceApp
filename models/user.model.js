const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
 
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        minlength: 3
    },

    firstName: {
        type: String,
        unique: true,
        trim: true,
        minlength: 3
    },
    lastName: {
        type: String,
  
        unique: true,
        trim: true,
        minlength: 3,
        default:null
    },

    mobile: {
        type: String,
        unique: true,
        trim: true,
        minlength: 3,
        default:null
    },
    address: {
        type: String,
        trim: true,
        default:null  
    },
    image: {
        type: String,
        trim: true,
        default:null

    },
    role: {
        type: String,
    
    },

});

const User = mongoose.model('User', userSchema);

module.exports = User;