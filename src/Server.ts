
import * as http from "http"
import express from "express"
import router from '@routers/index'
import { sequelize } from '@src/SequelizeInit'

class Server {

    public app: express.Express
    public server!: http.Server
    private port: number

    constructor(port: number = 3000) {
        this.app = express()
        this.app.use(express.json());
        this.port = port
        this.app.use(router)
        this.setupSequelize()
    }

    public start() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`)
        })
    }

    private setupSequelize() {
        sequelize.authenticate().then(() => {
            console.log('db connection success')
        }).catch((err: any) => {
            console.log('db connection fails', err)
        })
    }

}

export default Server
