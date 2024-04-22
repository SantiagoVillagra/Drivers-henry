const { Router } = require("express")
const routerDrivers = Router()
const { getDrivers, getDriverById, postDriver } = require("../handlers/driversHandler")

routerDrivers.get("/", (req, res) => getDrivers(req,res))

routerDrivers.get("/:idDriver", (req,res) => getDriverById(req,res))

routerDrivers.post("/", (req, res) => postDriver(req, res))

module.exports = routerDrivers