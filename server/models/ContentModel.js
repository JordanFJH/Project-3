const mongoose = require("mongoose")

const Schema = mongoose.Schema

const contentSchema = new Schema({
    name: { type: String, require: true },
    id: { type: String, require: true },
    length: { type: String, require: true },
    desc: { type: String },
    infoLink: { type: String },
    imgURL: { type: String },
    author: { type: String, default: null },
    progress: { type: String, default: "0" },
    consuming: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    type: { type: String, require: true }
})

const Content = mongoose.model("content", contentSchema)

module.exports = Content