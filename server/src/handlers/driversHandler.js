const { contAllDrivers, contDriverId, contDriverName, contPostDriver } = require("../controllers/driversControllers")

const getDrivers = async (req, res) => {
    const {name} = req.query
    try {
        const response = name? await contDriverName(name) : await contAllDrivers()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getDriverById = async (req, res) => {
    const { idDriver } = req.params
    const esString = isNaN(idDriver)
    try {
        const response = await contDriverId(idDriver, esString)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postDriver = async (req, res) => {
    const driverData = req.body
    try {
        const response = await contPostDriver(driverData)
        console.log(response);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getDrivers,
    getDriverById,
    postDriver
}