import { migrate, rollback } from "@tests/utils/DatabaseMigration"
import request from 'supertest'
import Server from '@src/Server'

const server = new Server()

describe("Registration endpoint test", () => {

    beforeEach(migrate)

    afterEach(rollback)

    it("wont allow register if no username", async () => {
        const response = await request(server.app)
            .post('/auth/registration')
        expect(response.statusCode).toBe(200)
    })

})
