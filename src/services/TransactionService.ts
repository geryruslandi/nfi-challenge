import Transaction, { TypeEnum } from "@src/models/Transaction"
import User from "@src/models/User"

class TransactionService {
    private user: User

    constructor(user: User) {
        this.user = user
    }

    public async deposit(amount: number) {
        const privateData = await this.user.$get('privateData')

        if(privateData == null) throw "Something went wrong"

        await Transaction.create({
            users_private_data_id: privateData.id,
            amount,
            type: TypeEnum.DEPOSIT
        })

        privateData.balance = privateData.balance + amount
        await privateData.save()

        return privateData
    }

    public async withdraw(amount:number) {
        const privateData = await this.user.$get('privateData')

        if(privateData == null) throw "Something went wrong"

        if(privateData.balance < amount) throw "Your balance is less than requested withdrawal amount"

        await Transaction.create({
            users_private_data_id: privateData.id,
            amount: -amount,
            type: TypeEnum.WITHDRAW
        })

        privateData.balance = privateData.balance - amount
        await privateData.save()

        return privateData
    }
}

export default TransactionService
