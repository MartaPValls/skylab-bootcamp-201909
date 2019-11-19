const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors')
const database = require('../../utils/database')
const { ObjectId } = database

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    const client = database()

    return client.connect()
        .then(connection => {
            const db = connection.db()

            users = db.collection('users')
            tasks = db.collection('tasks')

            return users.findOne({ _id: ObjectId(id) })
                .then(user => {
                    if(!user) throw new NotFoundError(`user with id ${id} not found`)

                    return tasks.updateMany({ user: ObjectId(id) }, { $set: { lastAccess: new Date }})
                        .then(result => {
                            if(!result.modifiedCount) throw Error('could not update tasks')

                            return tasks.find({ user: ObjectId(id) }).toArray()
                                .then(tasks => {
                                    
                                    tasks.forEach(task => {
                                    task.id = task._id.toString()
                                    delete task._id
    
                                    task.user = id
    
                                    task.lastAccess = lastAccess
                                })
                                return tasks
                            })
                        })
                })
        })
}



// return new Promise((resolve, reject) => {
//     const user = users.data.find(user => user.id === id)

//     if (!user) return reject(new NotFoundError(`user with id ${id} not found`))

//     const _tasks = tasks.data.filter(({ user }) => user === id)

//     _tasks.forEach(task => task.lastAccess = new Date)

//     tasks.persist().then(() => resolve(_tasks)).catch(reject)
// })