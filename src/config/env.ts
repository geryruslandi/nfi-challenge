import * as dotEnv from 'dotenv'

const configFile = (env: string) => {
    const dir = __dirname + '/../../'
    if (env === 'prod') return dir +'.env.prod'
    if (env === 'test') return dir + '.env.test'

    return dir + '.env'
}

const config = dotEnv.config({
    path: configFile(process.env.APP_ENV as string)
});

export default config.parsed;
