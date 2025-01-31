const yup = require('yup')

const projectSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('name is required'),
    description: yup
        .string()
        .trim()
        .required('description is required'),
    completed: yup
        .boolean()
})

module.exports = projectSchema
