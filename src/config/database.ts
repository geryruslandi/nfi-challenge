import env from "@src/config/env"

const config = {
    logging: env?.DB_LOGGING === 'true',
    database: env?.DB_DATABASE as string,
    dialect: env?.DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mssql' | 'mariadb',
    username: env?.DB_USERNAME as string,
    password: env?.DB_PASSWORD as string,
    port: Number(env?.DB_PORT) as number,
    host: env?.DB_HOST as string,
    storage: ':memory:',
    models: [__dirname + '/../models/*'],
}

export default config;
