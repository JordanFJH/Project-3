const mongoose = require("mongoose")

const Schema = mongoose.Schema

const contentSchema = new Schema({
    name: { type: String, require: true },
    id: { type: String, require: true },
    length: { type: String, require: true },
    progress: { type: String, default: "0" },
    completed: { type: Boolean, default: false },
    type: { type: String, require: true }
})

const Content = mongoose.model("content", contentSchema)

module.exports = Content