import User from "@src/models/User"
import bcrypt from 'bcrypt'

class RegistrationService {
    public async createUser(username: string, password: string) {
        const user = await User.create({
            username,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        })

        return user
    }
}

export default RegistrationService
