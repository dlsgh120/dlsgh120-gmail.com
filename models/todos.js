const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TodoSchema = new Schema({
    userId: {
        type:String,
        trim: true
    },
    name: {
        type:String,
        trim: true,
        required: [true, 'Please add some text']
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = Todos = mongoose.model('todos',TodoSchema);