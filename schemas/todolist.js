const mongoose = require('mongoose');


const todolist = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('todo', todolist);