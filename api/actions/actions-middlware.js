const actionSchema = require('../../services/actionSchema')
const Action = require('./actions-model')

function validateId(req, res, next) {
    Action.get(req.params.id)
        .then(result => {
            if(result) {
                req.found = result
                next()
            } else {
                next({
                    status: 404,
                    message: 'Id Not Found!'
                })
            }
        })
        .catch(next)
}

async function validateAction(req, res, next){
    try {
        const validated = await actionSchema.validate(req.body)
        req.body = validated
        next()
    } catch (err) {
        next({
            status: 400,
            message: err.message
        })
    }
}

module.exports = {
    validateId,
    validateAction
}
