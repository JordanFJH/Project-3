const User = require("../models/UserModel")
const bcrypt = require("bcrypt")

// Creating Account
async function createUser(req, res) {
    try {
        // Check if they exist
        const foundUser = await User.findOne({ username: req.body.username })
        if (foundUser) {
            return res.status(400).json({ message: "User already exists" })
        }
        // Encrypt password
        const encryptedPassword = await bcrypt.hash(req.body.password, 10)

        //Updating password and adding to database
        const newUser = await User.create({ ...req.body, password: encryptedPassword })
        console.log(newUser)
        res.status(200).json({ message: "User has been created" })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message })
    }
}


// Logging the user in
async function loginUser(req, res) {
    try {
        //Check if user exists
        const foundUser = await User.findOne({ username: req.body.username })
        if (!foundUser) {
            return res.status(400).json({ message: "Could not find user" })
        }
        // Check if password matches
        const validPassword = await bcrypt.compare(req.body.password, foundUser.password)
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid Credentials" })
        }
        res.status(200).json({ message: "User was able to log in" })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createUser,
    loginUser
}