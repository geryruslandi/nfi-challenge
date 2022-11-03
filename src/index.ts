import 'module-alias/register'

import dotenv from 'dotenv'
import Server from './Server'

dotenv.config();

const port = Number(process.env.APP_PORT)
const server = new Server(port)
server.start()

export default server
