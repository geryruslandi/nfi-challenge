import { migrate, rollback } from "@tests/utils/DatabaseMigration"
import request from 'supertest'
import Server from '@src/Server'
import RegistrationService from "@src/services/RegistrationService"
import User from "@src/models/User"
import UsersPrivateData from "@src/models/UsersPrivateData"
import Transaction, { TypeEnum } from "@src/models/Transaction"

const server = new Server()

describe("Admin Withdaw endpoint test", () => {

    let user: User

    beforeEach((done) => {

        const afterMigrate = async () => {
            const registerService = new RegistrationService()
            user = await registerService.createUser('geryruslandi', '123123123')

            await user.deposit(100)

            done()
        }

        migrate(afterMigrate)

    })

    afterEach(rollback)

    it("cant withdraw non exist user", async () => {
        const response = await request(server.app)
            .post('/admin/transactions/withdraw')
            .send({
                amount: 100,
                user_id: 999
            })

        expect(response.statusCode).toBe(422)
    })

    it("can withdraw existing user", async () => {

        const response = await request(server.app)
            .post('/admin/transactions/withdraw')
            .send({
                amount: 100,
                user_id: user.id
            })

        expect(response.statusCode).toBe(200)
    })

    it("cant withdraw if withdrawal amount is greater than user's balance", async () => {

        const response = await request(server.app)
            .post('/admin/transactions/withdraw')
            .send({
                amount: 101,
                user_id: user.id
            })

        expect(response.statusCode).toBe(422)
    })

    it("will deduct correct withdrawal amount", async () => {
        const response = await request(server.app)
            .post('/admin/transactions/withdraw')
            .send({
                amount: 95,
                user_id: user.id
            })

        const balance = response.body.data.private_data.balance

        const privateData = await UsersPrivateData.findOne()

        expect(balance).toBe(5)
        expect(privateData?.balance).toBe(5)
    })

    it("will set transaction's type as withdraw", async () => {
        await request(server.app)
            .post('/admin/transactions/withdraw')
            .send({
                amount: 100,
                user_id: user.id
            })

        const transaction = await Transaction.findOne({order: [['id', 'desc']]})

        expect(transaction?.type).toBe(TypeEnum.WITHDRAW)
    })

    it("wont withdraw if amount zero", async () => {
        const response = await request(server.app)
            .post('/admin/transactions/withdraw')
            .send({
                amount: 0,
                user_id: user.id
            })

        expect(response.statusCode).toBe(422)
    })

    it("wont withdraw if amount is negative", async () => {
        const response = await request(server.app)
            .post('/admin/transactions/withdraw')
            .send({
                amount: -100,
                user_id: user.id
            })

        expect(response.statusCode).toBe(422)
    })

    it("wont withdraw if amount is not integer", async () => {
        const response = await request(server.app)
            .post('/admin/transactions/withdraw')
            .send({
                amount: 'gery',
                user_id: user.id
            })

        expect(response.statusCode).toBe(422)
    })

    it("wont withdraw into other persons account", async () => {

        const registrationService = new RegistrationService()
        const otherPerson = await registrationService.createUser('otherperson', '123123123')
        await otherPerson.deposit(100)

        const response = await request(server.app)
            .post('/admin/transactions/withdraw')
            .send({
                amount: 100,
                user_id: user.id
            })

        const otherPersonsPrivateData = await otherPerson.$get('privateData')

        const currentUsersPrivateData = await user.$get('privateData')

        expect(response.statusCode).toBe(200)
        expect(otherPersonsPrivateData?.balance).toBe(100)
        expect(currentUsersPrivateData?.balance).toBe(0)
    })
})
