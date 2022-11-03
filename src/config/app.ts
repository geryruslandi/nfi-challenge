import env from "@src/config/env"

const appConfig = {
    jwt_key: env.APP_JWT_KEY as string
}

export default appConfig;
