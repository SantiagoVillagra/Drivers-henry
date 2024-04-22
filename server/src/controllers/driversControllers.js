const axios = require("axios")
const moment = require("moment")
const { Driver, Team } = require("../db")

const contDriverName = async (name) => {
    const resultApi = await axios(`http://localhost:5000/drivers/?name.forename=${name}`).then(({data}) => {
        return (data.map(({id, name, image, dob, nationality, teams, description}) => {
            const teamsSplit = teams?.split(",")
            const teamsArray = teamsSplit?.map(team => team.trim())
// ACA FALTA TRAER SOLO LOS PRIMEROS 15 CON ESE NOMBRE. 
            return ({
                id,
                name: name.forename,
                lastname: name.surname,
                description: !description? "There's not description available" : description,
                image: !image.url? "fakeURL.com" : image.url,
                nationality,
                dob,
                Teams: teamsArray? teamsArray : ["Sorry, there is no information about this driver teams."]
            })
        }))
    })
    const resultBase = await Driver.findAll({
        include: {
            model: Team,
            attributes: ["nombre"],
            through: {attributes: []}
        },
        where: {name: name}
    })
    const result = resultBase? resultBase.concat(resultApi) : resultApi
    //return result.length? result : `Sorry, there are no drivers found with de following name: ${name}`
    if(result.length>0){
        return result
    } else {
        return (`Sorry, there are no drivers found with de following name: ${name}`)
    }

    
}

const contAllDrivers = async () => {
    const resultApi = await axios("http://localhost:5000/drivers").then(({data}) => {
        return (data.map(({id, name, image, dob, nationality, teams, description}) => {
            const teamsSplit = teams?.split(",")
            const teamsArray = teamsSplit?.map(team => team.trim())

            return ({
                id,
                name: name.forename,
                lastname: name.surname,
                description: !description? "There's no description available" : description,
                image: !image.url? "fakeURL.com" : image.url,
                nationality,
                dob,
                Teams: teamsArray? teamsArray : ["Sorry, there is no information about this driver teams."]
            })
        }))
    })
    const resultBase = await Driver.findAll({
        include: {
            model: Team,
            attributes: ["nombre"],
            through: {attributes: []}
        },
    }).then(drivers => {
        const driversMap = drivers.map(driver => {
            const teamsArray = driver.Teams.map(team => team.nombre)
            return {...driver.dataValues, Teams: teamsArray}
        });
        return driversMap
    })

    const result = resultBase? resultBase.concat(resultApi) : resultApi
    return result
}

const contDriverId = async (id, esString) => {
    if (esString) {
        return await Driver.findByPk(id, {
            include: {
                model: Team,
                attributes: ["nombre"],
                through: {attributes: []}
            }
        })
    }
    const result = await axios(`http://localhost:5000/drivers/${id}`).then(({data: {id, name, image, dob, nationality, teams, description}}) => {
        const teamsSplit = teams?.split(",")
        const teamsArray = teamsSplit?.map(team => team.trim())

        return ({
            id,
            name: name.forename,
            lastname: name.surname,
            description: !description? "There's not description available" : description,
            image: !image.url? "fakeURL.com" : image.url,
            nationality,
            dob,
            Teams: teamsArray? teamsArray : ["Sorry, there is no information about this driver teams."],
        })
    })
    return result
}

const contPostDriver = async ({name, lastname, description, image, nationality, dob, team}) => {
    const formatedDob = moment(dob, "YYYY-MM-DD").format("YYYY-MM-DD") 
    // Me ayudo chatgpt, me arrojaba error:
    //Deprecation warning: value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.
    //antes le pasa la fecha directamente como un string
    const createDriver = await Driver.create({
        name, 
        lastname, 
        description, 
        image,
        nationality, 
        dob: formatedDob
    })
    createDriver.addTeams(team)
    console.log(createDriver.dataValues);
    return createDriver.dataValues
}

module.exports = {
    contAllDrivers,
    contDriverId,
    contDriverName,
    contPostDriver
}