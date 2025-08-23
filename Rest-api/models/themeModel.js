const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const themeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    creatorId:{
        type: String,
        ref: "User",
        required: true
    }});

module.exports = mongoose.model('Book', themeSchema);
