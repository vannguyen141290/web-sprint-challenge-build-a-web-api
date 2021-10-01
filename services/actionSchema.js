const yup = require('yup')

const actionSchema = yup.object().shape({
    project_id: yup
        .number()
        .required('project Id is required'),
    description: yup
        .string()
        .trim()
        .required('description is required')
        .max(128, 'Description should have 128 chars max'),
    notes: yup
        .string()
        .trim()
        .required('notes are required'),
    completed: yup
        .boolean()
})

module.exports = actionSchema
