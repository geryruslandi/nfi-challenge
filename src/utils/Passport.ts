import passport from "passport"
import passportJwt from "passport-jwt"
import appConfig from "@src/config/app"
import User from "@src/models/User"

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

export default passport
