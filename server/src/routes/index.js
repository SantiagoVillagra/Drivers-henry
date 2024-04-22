const { Router } = require("express");
const routerDrivers = require("./routerDrivers")
const routerTeams = require("./routerTeams")

const router = Router();
router.use("/drivers", routerDrivers)
router.use("/teams", routerTeams)

module.exports = router;
