import express from 'express'
import * as dotenv from "dotenv"
import path from 'path'
import { bootstrap } from './src/app.controller.js'
dotenv.config({path:path.resolve("./src/config/.env.prod")})
const app = express()
const port = process.env.PORT
bootstrap(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))