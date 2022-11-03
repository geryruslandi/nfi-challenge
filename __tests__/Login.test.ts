import { migrate, rollback } from "@tests/utils/DatabaseMigration"
import request from 'supertest'
import Server from '@src/Server'
import RegistrationService from "@src/services/RegistrationService"

const server = new Server()

describe("Login endpoint test", () => {

    beforeEach(migrate)

    afterEach(rollback)

    it("wont allow login if username field empty", async () => {
        const response = await request(server.app)
            .post('/auth/login')
            .send({
                password: 'test'
            })

        expect(response.statusCode).toBe(422)
    })

    it("wont allow login if username field less than 6 character", async () => {
        const response = await request(server.app)
            .post('/auth/login')
            .send({
                username: 'test',
                password: '123123123'
            })

        expect(response.statusCode).toBe(422)
    })

    it("wont allow login if password field empty", async () => {
        const response = await request(server.app)
            .post('/auth/login')
            .send({
                username: 'test'
            })

        expect(response.statusCode).toBe(422)
    })

    it("wont allow login if password field less than 8 character", async () => {
        const response = await request(server.app)
            .post('/auth/login')
            .send({
                username: 'geryruslandi',
                password: '123123'
            })

        expect(response.statusCode).toBe(422)
    })

    it("wont allow login if no user match with username or password", async () => {

        const service = new RegistrationService()
        await service.createUser('testinguser', 'testingpassword')

        const response = await request(server.app)
            .post('/auth/login')
            .send({
                username: 'geryruslandi',
                password: '123123123'
            })

        expect(response.statusCode).toBe(401)
    })

    it("wont allow login if username is not match", async () => {

        const service = new RegistrationService()
        await service.createUser('testinguser', 'testingpassword')

        const response = await request(server.app)
            .post('/auth/login')
            .send({
                username: 'geryruslandi',
                password: 'testingpassword'
            })

        expect(response.statusCode).toBe(401)
    })

    it("wont allow login if password is not match", async () => {

        const service = new RegistrationService()
        await service.createUser('testinguser', 'testingpassword')

        const response = await request(server.app)
            .post('/auth/login')
            .send({
                username: 'testinguser',
                password: '123123123'
            })

        expect(response.statusCode).toBe(401)
    })

    it("will allow login if username and password match", async () => {

        const service = new RegistrationService()
        await service.createUser('geryruslandi', '123123123')

        const response = await request(server.app)
            .post('/auth/login')
            .send({
                username: 'geryruslandi',
                password: '123123123'
            })

        expect(response.statusCode).toBe(200)
    })
})
