const contTeams = require("../controllers/teamsControllers")

const getTeams = async (req, res) => {
    try {
        const response = await contTeams()
        res.status(200).json({response: response})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {getTeams}