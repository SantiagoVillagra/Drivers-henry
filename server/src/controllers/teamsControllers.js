const axios = require("axios")
const { Team } = require("../db")

const contTeams = async () => {
    const teamsDeBase = await Team.findAll({attributes: ["nombre"]})
    if (teamsDeBase.length) {
        const resultBase = teamsDeBase.map(team => team.nombre)

        return resultBase
    } 

    const result = await axios("http://localhost:5000/drivers").then(({data})=> {
        const teamSet = new Set()
        data.forEach(driverData => {
            const driverTeam = driverData.teams?.split(",")
            driverTeam?.forEach(team => {
                teamSet.add(team.trim())
            })
        });
        const arrayTeamsOrder = Array.from(teamSet).sort()
        if (!arrayTeamsOrder.length) throw new Error("CANNOT GET TEAMS INFORMATION") 
        return arrayTeamsOrder
    })
    await Team.bulkCreate(result.map(team => { return ({nombre: team})}))
    return result
}

module.exports = contTeams