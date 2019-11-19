require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const database = require('../../utils/database')
const removeTask = require('.')
const { random } = Math
require('../../utils/array-random')
const { NotFoundError, ConflictError, ContentError } = require('../../utils/errors')
const { ObjectId } = database

describe('logic - remove task', () => {
    let client, users, tasks

    before(() => {
        client = database(DB_URL_TEST)

        return client.connect()
            .then(connection => {
                const db = connection.db()

                users = db.collection('users')
                tasks = db.collection('tasks')
            })
    })

    const statuses = ['TODO', 'DOING', 'REVIEW', 'DONE']
    let id, name, surname, email, username, password, taskIds, titles, descriptions

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        return users.insertOne({ name, surname, email, username, password })
            .then(({ insertedId }) => id = insertedId.toString())
            .then(() => {
                taskIds = []
                titles = []
                descriptions = []

                const insertions = []

                for (let i = 0; i < 10; i++) {
                    const task = {
                        user: ObjectId(id),
                        title: `title-${random()}`,
                        description: `description-${random()}`,
                        status: 'REVIEW',
                        date: new Date
                    }

                    insertions.push(tasks.insertOne(task)
                        .then(result => taskIds.push(result.insertedId.toString())))

                    titles.push(task.title)
                    descriptions.push(task.description)
                }

                for (let i = 0; i < 10; i++)
                    insertions.push(tasks.insertOne({
                        user: ObjectId(),
                        title: `title-${random()}`,
                        description: `description-${random()}`,
                        status: 'REVIEW',
                        date: new Date
                    }))

                return Promise.all(insertions)
            })
    })

    it('should succeed on correct user and task data', () => {
        const taskId = taskIds.random()

        return removeTask(id, taskId, newTitle, newDescription, newStatus)
            .then(response => {
                expect(response).to.not.exist

                return tasks.findOne({ _id: ObjectId(taskId) })
            })
            .then(task => {
                expect(task.user.toString()).to.equal(id)

                expect(task.title).to.exist
                expect(task.title).to.be.a('string')
                expect(task.title).to.have.length.greaterThan(0)
                expect(task.title).to.equal(newTitle)

                expect(task.description).to.exist
                expect(task.description).to.be.a('string')
                expect(task.description).to.have.length.greaterThan(0)
                expect(task.description).to.equal(newDescription)

                expect(task.status).to.exist
                expect(task.status).to.be.a('string')
                expect(task.status).to.have.length.greaterThan(0)
                expect(task.status).to.equal(newStatus)

                expect(task.date).to.exist
                expect(task.date).to.be.an.instanceOf(Date)

                expect(task.lastAccess).to.exist
                expect(task.lastAccess).to.be.an.instanceOf(Date)
            })
    })
    // TODO other test cases

    after(() => client.close())
})