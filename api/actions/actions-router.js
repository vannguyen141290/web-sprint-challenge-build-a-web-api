const express = require('express')
const Action = require('./actions-model')
const { validateprojectId } = require('../projects/projects-middleware')
const { validateId, validateAction } = require('./actions-middlware')

const router = express.Router()

router.get('/', validateId, (req, res) => {
    res.status(200).json(req.found)
})

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.found)
})

router.post('/', validateAction, (req, res, next) => {
    Action.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

router.put('/:id', validateId, validateAction, (req, res, next) => {
    validateprojectId(req.body.project_id)
        .then(project => {
            if (project) {
                Action.update(req.params.id, req.body)
                    .then(updatedAction => {
                        res.status(201).json(updatedAction)
                    })
                    .catch(next)
            } else {
                next({
                    status: 400,
                    message: 'please enter a valid project Id'
                })
            }
        })
        .catch(next)
})

router.delete('/:id', validateId, (req, res, next) => {
    Action.remove(req.params.id)
        .then(() => {
            res.status(200).json({
                message: 'action has been removed!'
            })
        })
        .catch(next)
})


module.exports = router
