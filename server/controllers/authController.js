const User = require("../models/UserModel")
const bcrypt = require("bcrypt")

// Creating Account
async function createUser(req, res) {
    // Check if they exist
    const foundUser = User.findOne({ username: req.body.username })
    if (foundUser) {
        return res.status(400).json({ message: "User already exists" })
    }
    // Encrypt password
    const encryptedPassword = await bcrypt.hash(req.body.password, 10)

    //Updating password and adding to database
    const newUser = await User.create({...req.body, password: encryptedPassword})
    console.log(newUser)
    res.status(200).json({ message: "User has been created" })

}


// Logging the user in
async function loginUser(req, res) {

}

module.exports = {
    createUser,
    loginUser
}