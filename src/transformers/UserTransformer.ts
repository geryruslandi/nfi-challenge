import User from "@src/models/User"
import UsersPrivateDataTransformer from "@src/transformers/UsersPrivateDataTransformer"

class UserTransformer {

    private user: User
    private _with: string[] = []

    constructor(user: User) {
        this.user = user
    }

    public get() {
        const data = {
            id: this.user.id,
            username: this.user.username,
            private_data: null as any
        }

        if(this._with.includes('privateData') && this.user.privateData) {
            const transformer = new UsersPrivateDataTransformer(this.user.privateData)
            data.private_data = transformer.get()
        }

        return data
    }

    public with(data: string[]) {
        this._with = data
    }

}

export default UserTransformer
