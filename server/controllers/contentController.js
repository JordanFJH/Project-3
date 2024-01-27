const User = require("../models/UserModel")
const Content = require("../models/ContentModel")


module.exports.getInfo = async (req, res) => {
    console.log("trying to get the user's content info")
    try {
        const username = req.header("Username")
        const foundUser = await User.findOne({ username: username }).populate("content")
        console.log("Found user in getinfo")
        res.status(200).json(foundUser?.content)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message })
    }



}

module.exports.addContent = async (req, res) => {
    console.log("In the addContent Function")

    try {
        const username = req.header("Username")

        const media = await Content.create(req.body)
        console.log("The media created ", media)
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


// Updating the content
module.exports.updateContent = async (req, res) => {
    console.log("updating content")
    try {
        await Content.findByIdAndUpdate(req.body._id, req.body)
        res.status(200).json({ message: "Content Updated" })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message })
    }
}

// Marking the content as complete
module.exports.completeContent = async (req, res) => {
    console.log("Handling completion of content")
    try {

        res.send(200).json({ message: "Content marked as complete" })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message })
    }
}