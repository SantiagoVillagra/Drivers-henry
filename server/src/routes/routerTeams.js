const { Router } = require("express")
const routerTeams = Router()
const { getTeams } = require("../handlers/teamHandler")

routerTeams.get("/", (req,res) => getTeams(req,res))

module.exports = routerTeams