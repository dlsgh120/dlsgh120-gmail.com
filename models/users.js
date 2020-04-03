const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim:true,
        required: [true, 'Please add some text']
    },
    userPassword: {
        type: String,
        trim:true,
        required: [true, 'Please add some text']
    },
    userEmail: {
        type: String,
        trim:true,
        required: [true, 'Please add some text']
    },
    userDate: {
        type:Date,
        default:Date.now
    },
    file: {
        type: String,
        trim: true
    },
    fileName: {
        type: String,
        trim: true
    }
});

module.exports = Users = mongoose.model('users',UserSchema);