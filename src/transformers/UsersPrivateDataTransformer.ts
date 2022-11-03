import UsersPrivateData from "@src/models/UsersPrivateData"

class UsersPrivateDataTransformer {

    private privateData: UsersPrivateData

    constructor(user: UsersPrivateData) {
        this.privateData = user
    }

    public get() {
        const data = {
            id: this.privateData.id,
            balance: this.privateData.balance,
        }

        return data
    }

}

export default UsersPrivateDataTransformer
