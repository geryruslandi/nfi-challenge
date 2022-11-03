import { migrate, rollback } from "@tests/utils/DatabaseMigration"
import request from 'supertest'
import Server from '@src/Server'
import RegistrationService from "@src/services/RegistrationService"
import User from "@src/models/User"
import UsersPrivateData from "@src/models/UsersPrivateData"
import Transaction, { TypeEnum } from "@src/models/Transaction"

const server = new Server()

describe("Deposit endpoint test", () => {

    let user: User

    beforeEach((done) => {

        const afterMigrate = async () => {
            const service = new RegistrationService()
            user = await service.createUser('geryruslandi', '123123123')

            done()
        }

        migrate(afterMigrate)

    })

    afterEach(rollback)

    it("cant deposit if not authenticated", async () => {
        const response = await request(server.app)
            .post('/transactions/deposit')
            .send({
                amount: 100
            })

        expect(response.statusCode).toBe(401)
    })

    it("can deposit if authenticated", async () => {
        const response = await request(server.app)
            .post('/transactions/deposit')
            .send({
                amount: 100
            })
            .set('Authorization', user.generateBearerToken())

        expect(response.statusCode).toBe(200)
    })

    it("will store correct deposit amount", async () => {
        const response = await request(server.app)
            .post('/transactions/deposit')
            .send({
                amount: 100
            })
            .set('Authorization', user.generateBearerToken())

        const balance = response.body.data.private_data.balance

        const privateData = await UsersPrivateData.findOne()

        expect(balance).toBe(100)
        expect(privateData?.balance).toBe(100)
    })

    it("will set transaction's type as deposit", async () => {
        await request(server.app)
            .post('/transactions/deposit')
            .send({
                amount: 100
            })
            .set('Authorization', user.generateBearerToken())

        const transaction = await Transaction.findOne()

        expect(transaction?.type).toBe(TypeEnum.DEPOSIT)
    })

    it("wont deposit if amount zero", async () => {
        const response = await request(server.app)
            .post('/transactions/deposit')
            .send({
                amount: 0
            })
            .set('Authorization', user.generateBearerToken())

        expect(response.statusCode).toBe(422)
    })

    it("wont deposit if amount negative", async () => {
        const response = await request(server.app)
            .post('/transactions/deposit')
            .send({
                amount: -100
            })
            .set('Authorization', user.generateBearerToken())

        expect(response.statusCode).toBe(422)
    })

    it("wont deposit if amount is not integer", async () => {
        const response = await request(server.app)
            .post('/transactions/deposit')
            .send({
                amount: 'gery'
            })
            .set('Authorization', user.generateBearerToken())

        expect(response.statusCode).toBe(422)
    })

    it("wont deposit into other persons account", async () => {

        const service = new RegistrationService()
        const otherPerson = await service.createUser('otherperson', '123123123')

        const response = await request(server.app)
            .post('/transactions/deposit')
            .send({
                amount: 100
            })
            .set('Authorization', user.generateBearerToken())

        const otherPersonsPrivateData = await otherPerson.$get('privateData')

        const currentUsersPrivateData = await user.$get('privateData')

        expect(response.statusCode).toBe(200)
        expect(otherPersonsPrivateData?.balance).toBe(0)
        expect(currentUsersPrivateData?.balance).toBe(100)
    })
})
