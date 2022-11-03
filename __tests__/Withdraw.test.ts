import { migrate, rollback } from "@tests/utils/DatabaseMigration"
import request from 'supertest'
import Server from '@src/Server'
import RegistrationService from "@src/services/RegistrationService"
import User from "@src/models/User"
import UsersPrivateData from "@src/models/UsersPrivateData"
import Transaction, { TypeEnum } from "@src/models/Transaction"

const server = new Server()

describe("Withdaw endpoint test", () => {

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

    it("cant withdraw if not authenticated", async () => {
        const response = await request(server.app)
            .post('/transactions/withdraw')
            .send({
                amount: 100
            })

        expect(response.statusCode).toBe(401)
    })

    it("can withdraw if authenticated", async () => {

        const response = await request(server.app)
            .post('/transactions/withdraw')
            .send({
                amount: 100
            })
            .set('Authorization', user.generateBearerToken())

        expect(response.statusCode).toBe(200)
    })

    it("can withdraw decimal amount", async () => {
        const response = await request(server.app)
            .post('/transactions/withdraw')
            .send({
                amount: 90.5
            })
            .set('Authorization', user.generateBearerToken())

        const balance = response.body.data.private_data.balance
        const privateData = await UsersPrivateData.findOne()

        expect(response.statusCode).toBe(200)
        expect(balance).toBe(9.5)
        expect(privateData?.balance).toBe(9.5)
    })

    it("cant withdraw if withdrawal amount is greater than user's balance", async () => {

        const response = await request(server.app)
            .post('/transactions/withdraw')
            .send({
                amount: 101
            })
            .set('Authorization', user.generateBearerToken())

        expect(response.statusCode).toBe(422)
    })

    it("will deduct correct withdraw amount", async () => {
        const response = await request(server.app)
            .post('/transactions/withdraw')
            .send({
                amount: 95
            })
            .set('Authorization', user.generateBearerToken())

        const balance = response.body.data.private_data.balance

        const privateData = await UsersPrivateData.findOne()

        expect(balance).toBe(5)
        expect(privateData?.balance).toBe(5)
    })

    it("will set transaction's type as withdraw", async () => {
        await request(server.app)
            .post('/transactions/withdraw')
            .send({
                amount: 100
            })
            .set('Authorization', user.generateBearerToken())

        const transaction = await Transaction.findOne({order: [['id', 'desc']]})

        expect(transaction?.type).toBe(TypeEnum.WITHDRAW)
    })

    it("wont withdraw if amount zero", async () => {
        const response = await request(server.app)
            .post('/transactions/withdraw')
            .send({
                amount: 0
            })
            .set('Authorization', user.generateBearerToken())

        expect(response.statusCode).toBe(422)
    })

    it("wont withdraw if amount negative", async () => {
        const response = await request(server.app)
            .post('/transactions/withdraw')
            .send({
                amount: -100
            })
            .set('Authorization', user.generateBearerToken())

        expect(response.statusCode).toBe(422)
    })

    it("wont withdraw if amount is not integer", async () => {
        const response = await request(server.app)
            .post('/transactions/withdraw')
            .send({
                amount: 'gery'
            })
            .set('Authorization', user.generateBearerToken())

        expect(response.statusCode).toBe(422)
    })

    it("wont withdraw into other persons account", async () => {

        const registrationService = new RegistrationService()
        const otherPerson = await registrationService.createUser('otherperson', '123123123')
        await otherPerson.deposit(100)

        const response = await request(server.app)
            .post('/transactions/withdraw')
            .send({
                amount: 100
            })
            .set('Authorization', user.generateBearerToken())

        const otherPersonsPrivateData = await otherPerson.$get('privateData')

        const currentUsersPrivateData = await user.$get('privateData')

        expect(response.statusCode).toBe(200)
        expect(otherPersonsPrivateData?.balance).toBe(100)
        expect(currentUsersPrivateData?.balance).toBe(0)
    })
})
