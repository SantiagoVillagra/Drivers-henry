require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const DATABASE = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/drivers`, {
  logging: false, 
  native: false, 
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(DATABASE));

let entries = Object.entries(DATABASE.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
DATABASE.models = Object.fromEntries(capsEntries);

const { Driver, Team } = DATABASE.models;
const DriverTeam = DATABASE.define('DriverTeam', {});

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Driver.belongsToMany(Team, {through: DriverTeam});
Team.belongsToMany(Driver, {through: DriverTeam})

module.exports = {
  Driver,
  Team,
  DriverTeam,
  ...DATABASE.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: DATABASE,     // para importart la conexión { conn } = require('./db.js');
};