const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //  ref: 'Takes the name of the model to be used' like user from User Schema
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true 
    },
    tag: {
        type: String,
        default: 'General'
    },
    data: {
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model('notes', NotesSchema);

module.exports = Note;