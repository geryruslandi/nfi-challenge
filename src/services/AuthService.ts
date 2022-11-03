import User from "@src/models/User";
import jwt from 'jsonwebtoken';
import appConfig from '@src/config/app'
import bcrypt from 'bcrypt'

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

    public isPasswordMatch(plainPassword: string) {
        return bcrypt.compareSync(plainPassword, this.user.password)
    }

    public static async login(username: string, password: string) {
        const user = await User.findOne({
            where: { username: username},
            include: ['privateData']
        })

        if(!user || !user.isPasswordMatch(password)){
            throw "Username or password not match"
        }

        return user
    }
}

export default AuthService
