const dotenv = require('dotenv')

const configFile = (env) => {
    if (env === 'prod') return '.env.prod'
    if (env === 'test') return '.env.test'

    return '.env'
}

dotenv.config({
    path: configFile(process.env.MIGRATION_ENV)
})


const config = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        bigNumberStrings: true
    }
}

module.exports = {
    development: config,
    test: config,
    production: config
};
