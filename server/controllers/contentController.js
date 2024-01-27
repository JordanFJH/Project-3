const User = require("../models/UserModel")
const Content = require("../models/ContentModel")


module.exports.getInfo = async (req, res) => {
    res.send("You tried to get the collections")
}

module.exports.addContent = async (req, res) => {

    try {
        const username = req.header("Username")
        
        const media = await Content.create(req.body)
        await User.findOneAndUpdate({ username: username }, {
            $push: {
                content: media._id
            }
        })
        res.status(200).json({ message: "Content Created" })
        //const foundUser = await User.findOne({ username: username })


    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message })
    }

}