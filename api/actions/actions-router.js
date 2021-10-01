const express = require('express')
const Action = require('./actions-model')
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

// router.get('/', (req, res, next) => {

// })

// router.get('/', (req, res, next) => {

// })


module.exports = router
