const dotenv = require('dotenv')

const configFile = (env) => {
    const dir = __dirname + '/../'
    if (env === 'prod') return dir +'.env.prod'
    if (env === 'test') return dir + '.env.test'

    return dir + '.env'
}

const env = dotenv.config({
    path: configFile(process.env.APP_ENV)
}).parsed


const config = {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: env.DB_DIALECT,
    dialectOptions: {
        bigNumberStrings: true
    }
}

module.exports = {
    development: config,
    test: config,
    production: config
};
