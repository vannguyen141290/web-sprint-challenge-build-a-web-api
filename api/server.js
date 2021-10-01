const express = require('express');
const server = express();
const projectRouter = require('./projects/projects-router')
const actionRouter = require('./actions/actions-router')

server.use(express.json())
server.use(logger)
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

server.get('/', (req, res) => {
    console.log('Welcome to Sprint')
})

server.get('*', (req, res, next) => {
    next({
        status: 404,
        message: `${req.method} method to ${req.originalUrl} Not Found!`
    })
})

server.use(errorHandling)

module.exports = server;

function logger(req, res, next) {
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`[${timestamp}] ${method} method to ${url}`)
    next()
}

function errorHandling(err, req, res, next) { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
}
