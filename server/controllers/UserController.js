const User = require("../models/UserModel")

async function show(req, res) {
    try {
        const foundUser = await User.findById(req.id)

        res.status(200).json({
            username: foundUser.username,
            email: foundUser.email,
            content: foundUser.content

        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }

}

module.exports = {
    show
}