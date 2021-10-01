const express = require('express')
const Project = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            if(projects) {
                res.status(200).json(projects)
            } else {
                res.status(200).json([])
            }
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Project.get(req.params.id)
        .then(project => {
            if(project) {
                res.status(200).json(project)
            } else {
                next({
                    status: 404,
                    message: 'Id Not Found!'
                })
            }
        })
        .catch(next)
})

// router.get('/', (req, res, next) => {

// })

// router.get('/', (req, res, next) => {

// })

// router.get('/', (req, res, next) => {

// })

// router.get('/', (req, res, next) => {

// })

module.exports = router
