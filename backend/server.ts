import * as jsonServer from 'json-server'
import {Express} from 'express';

import * as fs from 'fs'
import * as https from 'https'

import { handleAuthentication } from './auth';
import { handleAuthorization } from './authz';

const server: Express = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

server.use(jsonServer.bodyParser)

// get files security for https
const options = {
  cert: fs.readFileSync('./backend/keys/cert.pem'),
  key: fs.readFileSync('./backend/keys/key.pem')
}

//routes for Login
server.post('/login', handleAuthentication)
server.use('/orders', handleAuthorization)

server.use(router)
https.createServer(options, server).listen(3001, () => {
  console.log('JSON Server is running on port 3001')
})