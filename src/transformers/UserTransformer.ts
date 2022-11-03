import User from "@src/models/User"

class UserTransformer {

    private user: User

    constructor(user: User) {
        this.user = user
    }

    public get() {
        return {
            username: this.user.username
        }
    }

}

export default UserTransformer
