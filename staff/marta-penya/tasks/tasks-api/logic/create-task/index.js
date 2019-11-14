const validate = require('../../utils/validate')
const users = require('../../data/users')()
const tasks = require('../../data/tasks')()
const uuid = require('uuid/v4')
const { ConflictError } = require('../../utils/errors')

module.exports = function( id , title, description){
    validate.string(id)
    validate.string.notVoid('id', id)
    validate.string(title)
    validate.string.notVoid('title', title)
    validate.string(description)
    validate.string.notVoid('description', description)
    validate.string(status)
    validate.string.notVoid('status', status)

    return new Promise((resolve, reject) => {
        const user = users.data.find(user => user.id === id)
        if (!user) return reject(new ConflictError(`wrong user`))

        const taskId = uuid()

        const task = { 
            id: taskId, 
            user, 
            title, 
            description, 
            date: new Date, 
            status: 'TODO'}

        tasks.data.push(task)

        tasks.persist().then(resolve).catch(reject)
        
    })
}