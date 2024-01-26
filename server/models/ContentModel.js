const mongoose = require("mongoose")

const Schema = mongoose.Schema

const contentSchema = new Schema({
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    content: {
        type: mongoose.Types.ObjectId,
        ref: "content"
    }
})

const Content = mongoose.model("content", contentSchema)

module.exports = Content