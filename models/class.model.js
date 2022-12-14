const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    name: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})