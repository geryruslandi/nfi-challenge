import { migrate, rollback } from "@tests/utils/DatabaseMigration"
import request from 'supertest'
import Server from '@src/Server'
import RegistrationService from "@src/services/RegistrationService"
import User from "@src/models/User"

const server = new Server()

describe("Registration endpoint test", () => {

    beforeEach(migrate)

    afterEach(rollback)

    it("wont allow register if no username", async () => {

        const response = await request(server.app)
            .post('/auth/registration')
            .send({
                password: 'test'
            })

        expect(response.statusCode).toBe(422)
    })

    it("wont allow register if username is less than 6 character", async () => {

        const response = await request(server.app)
            .post('/auth/registration')
            .send({
                username: 'gery',
                password: '12345678'
            })

        expect(response.statusCode).toBe(422)
    })

    it("wont allow register if no password", async () => {

        const response = await request(server.app)
            .post('/auth/registration')
            .send({
                username: 'geryruslandi'
            })

        expect(response.statusCode).toBe(422)
    })

    it("wont allow register if password is less than 8 character", async () => {

        const response = await request(server.app)
            .post('/auth/registration')
            .send({
                username: 'geryruslandi',
                password: '123456'
            })

        expect(response.statusCode).toBe(422)
    })

    it("wont allow register username that already exist", async () => {

        const service = new RegistrationService()
        await service.createUser('geryruslandi', '123123123')

        const response = await request(server.app)
            .post('/auth/registration')
            .send({
                username: 'geryruslandi',
                password: '123456'
            })

        expect(response.statusCode).toBe(422)
    })

    it("can register user if username and password is correct", async () => {
        const response = await request(server.app)
            .post('/auth/registration')
            .send({
                username: 'geryruslandi',
                password: '12345678'
            })

        expect(response.statusCode).toBe(200)
    })

    it("will record newly created user data inside user table correctly", async () => {
        const response = await request(server.app)
            .post('/auth/registration')
            .send({
                username: 'geryruslandi',
                password: '12345678'
            })

        const model = await User.findOne({where: { username: 'geryruslandi'}})

        expect(response.statusCode).toBe(200)
        expect(model).toBeTruthy()
        expect(model?.isPasswordMatch('12345678')).toBeTruthy()
    })


})
