const projectSchema = require('../../services/projectSchema')
const Project = require('./projects-model')

function validateProjectId(req, res, next) {
    Project.get(req.params.id)
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

async function validateProject(req, res, next){
    try {
        const validated = await projectSchema.validate(req.body)
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
    validateProjectId,
    validateProject
}
