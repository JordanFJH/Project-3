const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


function generateToken(newUser) {
    const payLoad = {
        id: newUser._id,
        username: newUser.username
    }
    return jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: 99999 })

}


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

        //Generate token
        const token = generateToken(newUser)
        console.log(token)

        res.status(200).json({ token })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message })
    }
}


// Logging the user in
async function loginUser(req, res) {
    try {
        console.log("In the login")
        //Check if user exists
        const foundUser = await User.findOne({ username: req.body.username })
        console.log("After find user in login")
        if (!foundUser) {
            return res.status(400).json({ message: "Could not find user" })
        }
        console.log("found the user")
        // Check if password matches
        const validPassword = await bcrypt.compare(req.body.password, foundUser.password)
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid Credentials" })
        }
        console.log("password is okay")

        const token = generateToken(foundUser)
        console.log("Token generated")
        res.status(200).json({ token })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createUser,
    loginUser
}