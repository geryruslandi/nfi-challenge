import UsersPrivateData from "@src/models/UsersPrivateData"

class UsersPrivateDataTransformer {

    private privateData: UsersPrivateData

    constructor(data: UsersPrivateData) {
        this.privateData = data
    }

    public get() {
        const data = {
            id: this.privateData.id,
            balance: this.privateData.balance.toFixed(2),
        }

        return data
    }

}

export default UsersPrivateDataTransformer
