const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Course', CourseSchema);