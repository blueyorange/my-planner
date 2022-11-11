const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    image: [{ type: Buffer, get: (buffer) => buffer.toString("base64") }],
    text: { type: String },
    displayAsText: {type: Boolean, default: false}
})

const Item = mongoose.model('Item', ItemSchema)

const QuestionSchema = new mongoose.Schema({
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    options: [{ type: Map, of: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    correct: {type: String},
    tags: [{ type: String }],
});

module.exports = mongoose.model("Question", QuestionSchema);
