const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    // Area for content user has saved
    content: [{
        type: mongoose.Types.ObjectId,
        ref: "content"
    }]
})

const User = mongoose.model("user", userSchema)

module.exports = User