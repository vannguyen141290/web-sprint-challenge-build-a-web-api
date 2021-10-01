const express = require('express')
const Project = require('./projects-model')
const { validateId, validateProject } = require('./projects-middleware')

const router = express.Router()

router.get('/', validateId, (req, res) => {
    res.status(200).json(req.found)
})

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.found)
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

router.put('/:id', validateId, validateProject, (req, res, next) => {
    const { completed } = req.body
    if(completed === undefined) {
        next({
            status: 400,
            message: 'completed is required'
        })
    } else {
        Project.update(req.params.id, req.body)
            .then(updatedProject => {
                res.status(200).json(updatedProject)
            })
            .catch(next)
    }
})

// router.get('/', (req, res, next) => {

// })

// router.get('/', (req, res, next) => {

// })

module.exports = router
