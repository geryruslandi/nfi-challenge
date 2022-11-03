
import * as http from "http"
import express from "express"
import passport from "passport"
import passportJwt from "passport-jwt"
import router from '@routers/index'
import { sequelize } from '@src/SequelizeInit'
import appConfig from "@src/config/app"
import User from "@src/models/User"

class Server {

    public app: express.Express
    public server!: http.Server
    private port: number

    constructor(port: number = 3000) {
        this.app = express()
        this.app.use(express.json());
        this.port = port
        this.app.use(router)
        this.setupSequelize()
        this.setupPassport()
    }

    public start() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`)
        })
    }

    private setupSequelize() {
        sequelize.authenticate().then(() => {
            console.log('db connection success')
        }).catch((err: any) => {
            console.log('db connection fails', err)
        })
    }

    private setupPassport() {
        const jwtFromRequest = passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
        const secretOrKey = appConfig.jwt_key
        passport.use(
            new passportJwt.Strategy({jwtFromRequest,secretOrKey},
            (payload, done) => {
                User.findOne({where: {username: payload.username}})
                    .then((user) => {
                        if(!user) return done(true, false)

                        return done(null, user)
                    })
            })
        )
    }

}

export default Server
