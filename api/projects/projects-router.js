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

// router.get('/:id', (req, res, next) => {

// })

// router.get('/', (req, res, next) => {

// })

// router.get('/', (req, res, next) => {

// })

// router.get('/', (req, res, next) => {

// })

// router.get('/', (req, res, next) => {

// })

module.exports = router
