const validate = require('../../utils/validate')
const users = require('../../data/users')()
const tasks = require('../../data/tasks')()
const uuid = require('uuid/v4')
const { NotFoundError } = require('../../utils/errors')

module.exports = function (id, taskId, title, description) {
    validate.string(id)
    validate.string.notVoid('id', id)
    validate.string(taskId)
    validate.string.notVoid('taskId', taskId)
    validate.string(title)
    validate.string.notVoid('title', title)
    validate.string(description)
    validate.string.notVoid('description', description)

    return new Promise((resolve, reject) => {
        const user = users.data.find(user => user.id === id)

        if (!user) return reject(new NotFoundError(`user with id ${id} not found`))

        let task = tasks.data.find(task => task.id === taskId)

        if (!taskId) return reject(new NotFoundError(`task with id ${taskId} not found`))
    
        task = {
            id: taskId,
            user: id,
            title,
            description,
            status: 'TODO',
            lastAccess: new Date
        }

        tasks.data.push(task)

        tasks.persist().then(() => resolve(task.id)).catch(reject)
    })
}