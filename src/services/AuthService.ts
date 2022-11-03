import User from "@src/models/User";
import jwt from 'jsonwebtoken';
import appConfig from '@src/config/app'

class AuthService {

    private user: User

    constructor(user: User) {
        this.user = user
    }

    public generateToken() {
        // token valid for 7 days
        return jwt.sign(
            {username: this.user.username},
            appConfig.jwt_key,
            {expiresIn: 60 * 60 * 24 * 7}
        )
    }

    public checkToken(token: string) {

    }
}

export default AuthService
